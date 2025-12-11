import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { getAdminEmailTemplate, getUserEmailTemplate } from './email-templates.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*', // Configure allowed origins in production
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sbr-email-service' });
});

// Email endpoint
app.post('/api/request-flyer', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Get environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    const flyerUrl = process.env.FLYER_CDN_URL;
    const adminEmail = 'sbr@ga-sb.de';

    // Validate environment variables
    if (!gmailUser || !gmailPassword) {
      console.error('Gmail credentials not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    if (!flyerUrl) {
      console.error('Flyer CDN URL not configured');
      return res.status(500).json({ error: 'Flyer URL not configured' });
    }

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Prepare email templates
    const adminEmailHtml = getAdminEmailTemplate(email);
    const userEmailHtml = getUserEmailTemplate(flyerUrl);

    // Send admin notification email
    const adminMailOptions = {
      from: `"SynBio Reactor Summit" <${gmailUser}>`,
      to: adminEmail,
      subject: 'New Sponsoring Flyer Request',
      html: adminEmailHtml,
    };

    // Send user confirmation email
    const userMailOptions = {
      from: `"SynBio Reactor Summit" <${gmailUser}>`,
      to: email,
      subject: 'Your Sponsoring Flyer - SynBio Reactor Summit',
      html: userEmailHtml,
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    res.json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({
      error: 'Failed to send emails',
      message: error.message || 'Unknown error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
