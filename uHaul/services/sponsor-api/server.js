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
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'sponsor-emails.json');
const OFFERS_FILE = path.join(DATA_DIR, 'sponsor-offers.json');
const CATALOG_FILE = path.join(DATA_DIR, 'sponsoring-catalog.json');
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'change-this-secret-key';

await fs.mkdir(DATA_DIR, { recursive: true });

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || '*',
    credentials: true,
  }),
);
app.use(express.json());

async function readJson(file, fallback) {
  try {
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return fallback;
    throw error;
  }
}

async function writeJson(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
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
    if (!item.packageId) errors.push('Each item must have a packageId');
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

async function readEmails() {
  return await readJson(DATA_FILE, { emails: [], createdAt: new Date().toISOString() });
}

async function readOffers() {
  return await readJson(OFFERS_FILE, { offers: [], createdAt: new Date().toISOString() });
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'sponsor-api' });
});

app.get('/api/sponsoring-catalog', async (_req, res) => {
  try {
    const catalog = await readJson(CATALOG_FILE, { categories: [], packages: [] });
    return res.json({ success: true, catalog });
  } catch (error) {
    console.error('Error reading catalog:', error);
    return res.status(500).json({ error: 'Failed to read catalog' });
  }
});

app.post('/api/verify-sponsor-code', async (req, res) => {
  try {
    const code = normalizeCode(req.body?.code);
    if (!code) return res.status(400).json({ error: 'Access code is required' });

    const data = await readOffers();
    const offer = data.offers.find(
      (entry) => entry.active !== false && normalizeCode(entry.code) === code,
    );

    if (!offer) return res.status(404).json({ error: 'Invalid access code' });

    return res.json({
      success: true,
      offer: toPublicOffer(offer),
    });
  } catch (error) {
    console.error('Error verifying sponsor code:', error);
    return res.status(500).json({ error: 'Failed to verify access code' });
  }
});

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

app.post('/api/admin/sponsor-offers', async (req, res) => {
  if (!requireAdmin(req, res)) return;

  try {
    const { errors, code } = validateOfferPayload(req.body);
    if (errors.length > 0) return res.status(400).json({ error: errors.join('; ') });

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
    const offer = {
      id: randomUUID(),
      code,
      companyName: String(req.body.companyName).trim(),
      title: req.body.title?.trim() || '',
      message: req.body.message?.trim() || '',
      items,
      layout: normalizeLayout(req.body, items),
      active: req.body.active !== false,
      createdAt: now,
      updatedAt: now,
    };

    data.offers.push(offer);
    await writeJson(OFFERS_FILE, data);

    return res.status(201).json({ success: true, offer });
  } catch (error) {
    console.error('Error creating offer:', error);
    return res.status(500).json({ error: 'Failed to create offer' });
  }
});

app.put('/api/admin/sponsor-offers/:id', async (req, res) => {
  if (!requireAdmin(req, res)) return;

  try {
    const { errors, code } = validateOfferPayload(req.body);
    if (errors.length > 0) return res.status(400).json({ error: errors.join('; ') });

    const data = await readOffers();
    const index = data.offers.findIndex((entry) => entry.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Offer not found' });

    const duplicate = data.offers.some(
      (entry, i) => i !== index && normalizeCode(entry.code) === code,
    );
    if (duplicate) {
      return res.status(409).json({ error: 'An offer with this access code already exists' });
    }

    const items = req.body.items.map((item) => ({
      packageId: item.packageId,
      price: item.price,
    }));
    const updated = {
      ...data.offers[index],
      code,
      companyName: String(req.body.companyName).trim(),
      title: req.body.title?.trim() || '',
      message: req.body.message?.trim() || '',
      items,
      layout: normalizeLayout(req.body, items),
      active: req.body.active !== false,
      updatedAt: new Date().toISOString(),
    };

    data.offers[index] = updated;
    await writeJson(OFFERS_FILE, data);

    return res.json({ success: true, offer: updated });
  } catch (error) {
    console.error('Error updating offer:', error);
    return res.status(500).json({ error: 'Failed to update offer' });
  }
});

app.delete('/api/admin/sponsor-offers/:id', async (req, res) => {
  if (!requireAdmin(req, res)) return;

  try {
    const data = await readOffers();
    const index = data.offers.findIndex((entry) => entry.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Offer not found' });

    const [removed] = data.offers.splice(index, 1);
    await writeJson(OFFERS_FILE, data);

    return res.json({ success: true, offer: removed });
  } catch (error) {
    console.error('Error deleting offer:', error);
    return res.status(500).json({ error: 'Failed to delete offer' });
  }
});

app.post('/api/store-sponsor-email', async (req, res) => {
  try {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const data = await readEmails();
    const emailLower = email.toLowerCase().trim();
    const exists = data.emails.some((entry) => entry.email.toLowerCase() === emailLower);

    if (!exists) {
      data.emails.push({
        email: emailLower,
        timestamp: new Date().toISOString(),
        ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
      });

      await writeJson(DATA_FILE, data);
    }

    return res.json({
      success: true,
      message: exists ? 'Email already registered' : 'Email stored successfully',
      alreadyExists: exists,
    });
  } catch (error) {
    console.error('Error storing email:', error);
    return res.status(500).json({
      error: 'Failed to store email',
      message: error.message,
    });
  }
});

app.get('/api/admin/sponsor-emails', async (req, res) => {
  if (!requireAdmin(req, res)) return;

  try {
    const data = await readEmails();

    return res.json({
      success: true,
      count: data.emails.length,
      emails: data.emails,
      createdAt: data.createdAt,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error reading emails:', error);
    return res.status(500).json({
      error: 'Failed to read emails',
      message: error.message,
    });
  }
});

app.get('/api/admin/sponsor-emails/export', async (req, res) => {
  if (!requireAdmin(req, res)) return;

  try {
    const data = await readEmails();
    const format = req.query.format || 'csv';

    if (format === 'csv') {
      const csvHeader = 'Email,Timestamp,IP Address\n';
      const csvRows = data.emails
        .map((entry) => `"${entry.email}","${entry.timestamp}","${entry.ip}"`)
        .join('\n');
      const csv = csvHeader + csvRows;

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="sponsor-emails-${new Date().toISOString().split('T')[0]}.csv"`,
      );
      return res.send(csv);
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="sponsor-emails-${new Date().toISOString().split('T')[0]}.json"`,
    );
    return res.json(data);
  } catch (error) {
    console.error('Error exporting emails:', error);
    return res.status(500).json({
      error: 'Failed to export emails',
      message: error.message,
    });
  }
});

app.delete('/api/admin/sponsor-emails', async (req, res) => {
  if (!requireAdmin(req, res)) return;

  try {
    const emptyData = { emails: [], createdAt: new Date().toISOString() };
    await writeJson(DATA_FILE, emptyData);

    return res.json({
      success: true,
      message: 'All emails deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting emails:', error);
    return res.status(500).json({
      error: 'Failed to delete emails',
      message: error.message,
    });
  }
});

const listenHost = process.argv.includes('--host') ? '0.0.0.0' : undefined;

app.listen(PORT, listenHost, () => {
  console.log(`Sponsor API server running on port ${PORT}${listenHost ? ` (${listenHost})` : ''}`);
  console.log(`Data directory: ${DATA_DIR}`);
});
