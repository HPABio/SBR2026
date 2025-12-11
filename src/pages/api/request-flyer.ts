import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { getAdminEmailTemplate, getUserEmailTemplate } from '../../lib/email-templates';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get environment variables
    const gmailUser = import.meta.env.GMAIL_USER;
    const gmailPassword = import.meta.env.GMAIL_APP_PASSWORD;
    const flyerUrl = import.meta.env.FLYER_CDN_URL;
    const adminEmail = 'sbr@ga-sb.de';

    // Validate environment variables
    if (!gmailUser || !gmailPassword) {
      console.error('Gmail credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!flyerUrl) {
      console.error('Flyer CDN URL not configured');
      return new Response(
        JSON.stringify({ error: 'Flyer URL not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
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

    return new Response(
      JSON.stringify({ success: true, message: 'Emails sent successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending emails:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send emails',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
