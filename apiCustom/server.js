import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data', 'sponsor-emails.json');
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sponsor-email-api' });
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

app.listen(PORT, () => {
  console.log(`Sponsor Email API server running on port ${PORT}`);
  console.log(`Data file: ${DATA_FILE}`);
  console.log(`Admin secret: ${ADMIN_SECRET.substring(0, 10)}...`);
});





