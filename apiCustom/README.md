# SBR Sponsor Email API

API service for storing and exporting sponsor email addresses collected from the sponsorship packages page.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Set a secure `ADMIN_SECRET` for accessing email export endpoints
   - Configure `ALLOWED_ORIGIN` for CORS (use `*` for development, specific domain for production)

3. **Update `.env` file:**
   ```env
   PORT=3001
   ALLOWED_ORIGIN=*
   ADMIN_SECRET=your-secure-secret-key-here
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

### POST `/api/store-sponsor-email`

Stores a sponsor email address.

**Request:**
```json
{
  "email": "sponsor@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email stored successfully",
  "alreadyExists": false
}
```

### GET `/api/admin/sponsor-emails?secret=YOUR_SECRET`

Get all stored email addresses (requires admin secret).

**Response:**
```json
{
  "success": true,
  "count": 10,
  "emails": [
    {
      "email": "sponsor@example.com",
      "timestamp": "2025-12-11T10:30:00.000Z",
      "ip": "192.168.1.1"
    }
  ],
  "createdAt": "2025-12-11T00:00:00.000Z",
  "lastUpdated": "2025-12-11T10:30:00.000Z"
}
```

### GET `/api/admin/sponsor-emails/export?secret=YOUR_SECRET&format=csv`

Export emails as CSV or JSON file.

**Query Parameters:**
- `secret`: Admin secret key (required)
- `format`: `csv` or `json` (default: `csv`)

**Response:** Downloads a file with all emails

### DELETE `/api/admin/sponsor-emails?secret=YOUR_SECRET`

Delete all stored emails (requires admin secret).

**Response:**
```json
{
  "success": true,
  "message": "All emails deleted successfully"
}
```

## Data Storage

Emails are stored in `data/sponsor-emails.json` in the following format:

```json
{
  "emails": [
    {
      "email": "sponsor@example.com",
      "timestamp": "2025-12-11T10:30:00.000Z",
      "ip": "192.168.1.1"
    }
  ],
  "createdAt": "2025-12-11T00:00:00.000Z"
}
```

## Admin Interface

A simple HTML admin interface is provided at `admin.html`. Open it in your browser to:

- View all collected emails
- Export emails as CSV or JSON
- Delete all emails
- View statistics

**Usage:**
1. Start the API server
2. Open `admin.html` in your browser
3. Enter the API URL (default: `http://localhost:3001`)
4. Enter your admin secret
5. Click "Load Emails" to view all collected emails

## Frontend Integration

The frontend component has been updated to automatically send emails to this API. The API URL can be configured via environment variable:

```env
PUBLIC_SPONSOR_EMAIL_API_URL=http://localhost:3001
```

Or it defaults to `http://localhost:3001` for development.

## Deployment

This service can be deployed independently:

- **Vercel:** Use serverless functions
- **Railway/Render:** Deploy as Node.js service
- **Docker:** Create a Dockerfile and deploy to any container platform
- **Cloud Run/Lambda:** Deploy as serverless function

## Security Notes

- Always use a strong `ADMIN_SECRET` in production
- Configure `ALLOWED_ORIGIN` to restrict CORS to your domain
- Consider adding rate limiting for production
- The data file should be backed up regularly

