# SBR Email Service

Standalone email service for handling sponsoring flyer requests for the SynBio Reactor Summit.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in your Gmail credentials and CDN URL

3. **Generate Gmail App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Or: Google Account > Security > 2-Step Verification > App passwords
   - Generate a password for "Mail"

4. **Update `.env` file:**
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-generated-app-password
   FLYER_CDN_URL=https://your-cdn.com/flyer.pdf
   PORT=3000
   ALLOWED_ORIGIN=https://yourdomain.com
   ```

## Running

**Development:**
```bash
npm run dev
# or
bun run dev
```

**Production:**
```bash
npm start
# or
bun start
```

## API Endpoints

### POST `/api/request-flyer`

Sends notification email to admin and confirmation email to user.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Emails sent successfully"
}
```

### GET `/health`

Health check endpoint.

## Deployment

This service can be deployed independently:

- **Vercel:** Use serverless functions
- **Railway/Render:** Deploy as Node.js service
- **Docker:** Create a Dockerfile and deploy to any container platform
- **Cloud Run/Lambda:** Deploy as serverless function

## Frontend Integration

Update the frontend to point to this service:

```javascript
const response = await fetch('https://your-email-service.com/api/request-flyer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
});
```
