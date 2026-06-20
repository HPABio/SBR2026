import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data', 'sponsor-emails.json');
const OFFERS_FILE = path.join(__dirname, 'data', 'sponsor-offers.json');
const CATALOG_FILE = path.join(__dirname, 'data', 'sponsoring-catalog.json');
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'change-this-secret-key';

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
try {
  await fs.mkdir(dataDir, { recursive: true });
} catch (error) {
  // Directory might already exist
}

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*', // Configure allowed origins in production
  credentials: true
}));
app.use(express.json());

// Helper function to read emails from file
async function readEmails() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist yet, return empty array
    return { emails: [], createdAt: new Date().toISOString() };
  }
}

// Helper function to write emails to file
async function writeEmails(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

async function readOffers() {
  try {
    const data = await fs.readFile(OFFERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { offers: [], createdAt: new Date().toISOString() };
  }
}

async function writeOffers(data) {
  await fs.writeFile(OFFERS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

async function readCatalog() {
  const data = await fs.readFile(CATALOG_FILE, 'utf-8');
  return JSON.parse(data);
}

function requireAdmin(req, res) {
  const secret = req.query.secret || req.headers['x-admin-secret'];
  if (secret !== ADMIN_SECRET) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

function normalizeCode(code) {
  return String(code || '').trim().toLowerCase();
}

function validateOfferPayload(body) {
  const errors = [];

  if (!body.companyName || !String(body.companyName).trim()) {
    errors.push('companyName is required');
  }

  const code = normalizeCode(body.code);
  if (!code || code.length < 3) {
    errors.push('code must be at least 3 characters');
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    errors.push('At least one sponsoring option must be selected');
  }

  const itemIds = new Set();
  for (const item of body.items || []) {
    if (!item.packageId) {
      errors.push('Each item must have a packageId');
    }
    itemIds.add(item.packageId);
    if (item.price !== 'custom' && (typeof item.price !== 'number' || item.price < 0)) {
      errors.push(`Invalid price for package ${item.packageId}`);
    }
  }

  if (body.layout?.sections) {
    for (const section of body.layout.sections) {
      for (const packageId of section.packageIds || []) {
        if (!itemIds.has(packageId)) {
          errors.push(`Layout references unselected package ${packageId}`);
        }
      }
    }
  }

  return { errors, code };
}

function normalizeLayout(body, items) {
  const itemIds = new Set(items.map((item) => item.packageId));

  if (!body.layout?.sections?.length) {
    return null;
  }

  const sectionIds = ['main', 'visibility', 'program', 'digital', 'video', 'scholarship'];
  return {
    sections: sectionIds.map((id) => {
      const existing = body.layout.sections.find((section) => section.id === id);
      const packageIds = (existing?.packageIds || []).filter((pid) => itemIds.has(pid));
      return {
        id,
        enabled: existing?.enabled === true,
        packageIds,
      };
    }),
  };
}

function toPublicOffer(offer) {
  return {
    id: offer.id,
    companyName: offer.companyName,
    title: offer.title || `Sponsorship Offer for ${offer.companyName}`,
    message: offer.message || '',
    items: offer.items,
    layout: offer.layout || null,
  };
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sponsor-api' });
});

// Public catalog of all sponsoring options (for admin UI)
app.get('/api/sponsoring-catalog', async (req, res) => {
  try {
    const catalog = await readCatalog();
    return res.json({ success: true, catalog });
  } catch (error) {
    console.error('Error reading catalog:', error);
    return res.status(500).json({ error: 'Failed to read catalog' });
  }
});

// Verify sponsor access code and return tailored offer
app.post('/api/verify-sponsor-code', async (req, res) => {
  try {
    const code = normalizeCode(req.body?.code);
    if (!code) {
      return res.status(400).json({ error: 'Access code is required' });
    }

    const data = await readOffers();
    const offer = data.offers.find(
      (entry) => entry.active !== false && normalizeCode(entry.code) === code,
    );

    if (!offer) {
      return res.status(404).json({ error: 'Invalid access code' });
    }

    return res.json({
      success: true,
      offer: toPublicOffer(offer),
    });
  } catch (error) {
    console.error('Error verifying sponsor code:', error);
    return res.status(500).json({ error: 'Failed to verify access code' });
  }
});

// Admin: list all sponsor offers
app.get('/api/admin/sponsor-offers', async (req, res) => {
  if (!requireAdmin(req, res)) return;

  try {
    const data = await readOffers();
    return res.json({
      success: true,
      count: data.offers.length,
      offers: data.offers,
      createdAt: data.createdAt,
    });
  } catch (error) {
    console.error('Error reading offers:', error);
    return res.status(500).json({ error: 'Failed to read offers' });
  }
});

// Admin: create sponsor offer
app.post('/api/admin/sponsor-offers', async (req, res) => {
  if (!requireAdmin(req, res)) return;

  try {
    const { errors, code } = validateOfferPayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join('; ') });
    }

    const data = await readOffers();
    const duplicate = data.offers.some((entry) => normalizeCode(entry.code) === code);
    if (duplicate) {
      return res.status(409).json({ error: 'An offer with this access code already exists' });
    }

    const now = new Date().toISOString();
    const items = req.body.items.map((item) => ({
      packageId: item.packageId,
      price: item.price,
    }));
    const layout = normalizeLayout(req.body, items);
    const offer = {
      id: randomUUID(),
      code,
      companyName: String(req.body.companyName).trim(),
      title: req.body.title?.trim() || '',
      message: req.body.message?.trim() || '',
      items,
      layout,
      active: req.body.active !== false,
      createdAt: now,
      updatedAt: now,
    };

    data.offers.push(offer);
    await writeOffers(data);

    return res.status(201).json({ success: true, offer });
  } catch (error) {
    console.error('Error creating offer:', error);
    return res.status(500).json({ error: 'Failed to create offer' });
  }
});

// Admin: update sponsor offer
app.put('/api/admin/sponsor-offers/:id', async (req, res) => {
  if (!requireAdmin(req, res)) return;

  try {
    const { errors, code } = validateOfferPayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join('; ') });
    }

    const data = await readOffers();
    const index = data.offers.findIndex((entry) => entry.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    const duplicate = data.offers.some(
      (entry, i) => i !== index && normalizeCode(entry.code) === code,
    );
    if (duplicate) {
      return res.status(409).json({ error: 'An offer with this access code already exists' });
    }

    const existing = data.offers[index];
    const items = req.body.items.map((item) => ({
      packageId: item.packageId,
      price: item.price,
    }));
    const layout = normalizeLayout(req.body, items);
    const updated = {
      ...existing,
      code,
      companyName: String(req.body.companyName).trim(),
      title: req.body.title?.trim() || '',
      message: req.body.message?.trim() || '',
      items,
      layout,
      active: req.body.active !== false,
      updatedAt: new Date().toISOString(),
    };

    data.offers[index] = updated;
    await writeOffers(data);

    return res.json({ success: true, offer: updated });
  } catch (error) {
    console.error('Error updating offer:', error);
    return res.status(500).json({ error: 'Failed to update offer' });
  }
});

// Admin: delete sponsor offer
app.delete('/api/admin/sponsor-offers/:id', async (req, res) => {
  if (!requireAdmin(req, res)) return;

  try {
    const data = await readOffers();
    const index = data.offers.findIndex((entry) => entry.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    const [removed] = data.offers.splice(index, 1);
    await writeOffers(data);

    return res.json({ success: true, offer: removed });
  } catch (error) {
    console.error('Error deleting offer:', error);
    return res.status(500).json({ error: 'Failed to delete offer' });
  }
});

// Store sponsor email endpoint
app.post('/api/store-sponsor-email', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Read existing emails
    const data = await readEmails();
    
    // Check if email already exists
    const emailLower = email.toLowerCase().trim();
    const exists = data.emails.some(e => e.email.toLowerCase() === emailLower);
    
    if (!exists) {
      // Add new email with timestamp
      data.emails.push({
        email: emailLower,
        timestamp: new Date().toISOString(),
        ip: req.ip || req.headers['x-forwarded-for'] || 'unknown'
      });
      
      // Write back to file
      await writeEmails(data);
    }

    return res.json({ 
      success: true, 
      message: exists ? 'Email already registered' : 'Email stored successfully',
      alreadyExists: exists
    });
  } catch (error) {
    console.error('Error storing email:', error);
    return res.status(500).json({ 
      error: 'Failed to store email',
      message: error.message 
    });
  }
});

// Admin endpoint to get all emails (requires secret)
app.get('/api/admin/sponsor-emails', async (req, res) => {
  try {
    const secret = req.query.secret || req.headers['x-admin-secret'];
    
    if (secret !== ADMIN_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const data = await readEmails();
    
    return res.json({
      success: true,
      count: data.emails.length,
      emails: data.emails,
      createdAt: data.createdAt,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error reading emails:', error);
    return res.status(500).json({ 
      error: 'Failed to read emails',
      message: error.message 
    });
  }
});

// Admin endpoint to export emails as CSV
app.get('/api/admin/sponsor-emails/export', async (req, res) => {
  try {
    const secret = req.query.secret || req.headers['x-admin-secret'];
    const format = req.query.format || 'csv'; // csv or json
    
    if (secret !== ADMIN_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const data = await readEmails();
    
    if (format === 'csv') {
      // Generate CSV
      const csvHeader = 'Email,Timestamp,IP Address\n';
      const csvRows = data.emails.map(e => 
        `"${e.email}","${e.timestamp}","${e.ip}"`
      ).join('\n');
      const csv = csvHeader + csvRows;
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="sponsor-emails-${new Date().toISOString().split('T')[0]}.csv"`);
      return res.send(csv);
    } else {
      // Return JSON
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="sponsor-emails-${new Date().toISOString().split('T')[0]}.json"`);
      return res.json(data);
    }
  } catch (error) {
    console.error('Error exporting emails:', error);
    return res.status(500).json({ 
      error: 'Failed to export emails',
      message: error.message 
    });
  }
});

// Admin endpoint to delete all emails (requires secret)
app.delete('/api/admin/sponsor-emails', async (req, res) => {
  try {
    const secret = req.query.secret || req.headers['x-admin-secret'];
    
    if (secret !== ADMIN_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const emptyData = { emails: [], createdAt: new Date().toISOString() };
    await writeEmails(emptyData);
    
    return res.json({
      success: true,
      message: 'All emails deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting emails:', error);
    return res.status(500).json({ 
      error: 'Failed to delete emails',
      message: error.message 
    });
  }
});

// Serve admin HTML pages
app.use('/admin', express.static(__dirname));

const listenHost = process.argv.includes('--host') ? '0.0.0.0' : undefined;

app.listen(PORT, listenHost, () => {
  console.log(`Sponsor API server running on port ${PORT}${listenHost ? ` (${listenHost})` : ''}`);
  console.log(`Emails file: ${DATA_FILE}`);
  console.log(`Offers file: ${OFFERS_FILE}`);
  console.log(`Admin UI: http://localhost:${PORT}/admin/offers-admin.html`);
  console.log(`Admin secret: ${ADMIN_SECRET.substring(0, 10)}...`);
});
















