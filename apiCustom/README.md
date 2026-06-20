# SBR Sponsor API

API service for managing tailored sponsor offers with access codes, plus legacy email collection.

## Setup

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Configure environment variables:**
   ```env
   PORT=3001
   ALLOWED_ORIGIN=*
   ADMIN_SECRET=your-secure-secret-key-here
   ```

## Running

```bash
bun run dev
```

Admin UI: `http://localhost:3001/admin/offers-admin.html`

## Sponsor Offers (New)

### POST `/api/verify-sponsor-code`

Public endpoint — verifies an access code and returns the tailored offer.

```json
{ "code": "company123" }
```

### GET `/api/sponsoring-catalog`

Returns all available sponsoring options for the admin UI.

### Admin CRUD (requires `ADMIN_SECRET`)

- `GET /api/admin/sponsor-offers`
- `POST /api/admin/sponsor-offers`
- `PUT /api/admin/sponsor-offers/:id`
- `DELETE /api/admin/sponsor-offers/:id`

**Create offer example:**
```json
{
  "companyName": "Acme Biotech",
  "code": "company123",
  "title": "Your Sponsorship Offer",
  "message": "We put this package together specifically for your team.",
  "active": true,
  "items": [
    { "packageId": "basic", "price": 800 },
    { "packageId": "booth-regular-small", "price": 1200 }
  ]
}
```

Offers are stored in `data/sponsor-offers.json`.

## Legacy Email Endpoints

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

Configure the API URL via environment variable:

```env
PUBLIC_SPONSOR_API_URL=http://localhost:3001
```

On the sponsoring page, sponsors enter their access code to view a tailored package built in the admin UI.

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


