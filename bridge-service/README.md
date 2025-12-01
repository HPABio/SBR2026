# Ticket Tailor → Swapcard Bridge Service

A lightweight Python + FastAPI microservice that bridges Ticket Tailor webhooks with Swapcard's GraphQL API, automatically importing attendees when tickets are purchased.

## Architecture

- **Ticket Tailor** sends `ORDER.CREATED` (or `ORDER.UPDATED`) webhooks to `POST /ticket-tailor/webhook`
- The service transforms the payload into Swapcard's `importEventPeople` mutation
- Calls Swapcard's GraphQL API with your access token and event ID

## Setup

### For Coolify Deployment

1. **Connect Repository**: Point Coolify at this `bridge-service` directory
2. **Configure Environment Variables**: Add all variables from `.env.example` in Coolify's environment settings
3. **Set Internal Port**: Configure the service to use port `3000` internally
4. **Deploy**: Coolify will build and deploy automatically

### For Local Development

1. **Copy environment file**:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** with your actual credentials

3. **Run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

4. **Or run directly with Python**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port 3000
   ```

## Environment Variables

See `.env.example` for all required variables:

- `SWAPCARD_ACCESS_TOKEN`: Your Swapcard API access token
- `SWAPCARD_EVENT_ID`: Your Swapcard event ID
- `SWAPCARD_DEFAULT_GROUP_ID`: (Optional) Default group to assign attendees to
- `TICKETTAILOR_WEBHOOK_SECRET`: (Optional) Secret for webhook signature verification

## Connecting Ticket Tailor & Swapcard

### 1. Swapcard Setup

- Get your access token, event ID, and (optionally) a group ID from Swapcard
- Add these to your environment variables

### 2. Ticket Tailor Webhook Configuration

In Ticket Tailor dashboard:

- **URL**: `https://your-domain.com/ticket-tailor/webhook`
- **Events**: Select `ORDER.CREATED` (and optionally `ORDER.UPDATED`)
- **Secret**: (Optional) Set a shared secret and implement HMAC verification

### 3. Testing

1. Place a test order in Ticket Tailor
2. Check service logs to confirm the Swapcard API call
3. Verify in Swapcard Studio that the attendee appears under People

## API Endpoints

- `POST /ticket-tailor/webhook` - Receives Ticket Tailor webhooks
- `GET /health` - Health check endpoint for monitoring

## Notes

- The service maps Ticket Tailor custom questions (e.g., "Associated Company/Institution") to Swapcard profile fields
- Each ticket's barcode is synced to Swapcard as a QR code
- Uses `clientId` based on ticket ID for create-or-update behavior

## Future Enhancements

- Webhook signature verification for Ticket Tailor
- Enhanced error logging and monitoring
- Mapping specific Ticket Tailor questions to Swapcard customFields or groups
- Support for additional Ticket Tailor event types

