# Coolify Deployment

This project is split into two Coolify applications:

1. The Astro frontend deploys from the root `Dockerfile`.
2. Backend tools deploy as one Docker Compose stack from `services/docker-compose.yml`.

Coolify should handle the public reverse proxy, TLS certificates, and domains. Do not use `Dockerfile.nginx` for the main Coolify deployment unless you explicitly need a self-contained nginx container.

## Backend App

Create a new Coolify application for the backend stack.

Use these settings:

- Build pack: Docker Compose
- Compose file: `services/docker-compose.yml`
- Public service: `sponsor-api`
- Internal service port: `3001`
- Health check path: `/health`

Set these environment variables in Coolify:

```bash
ADMIN_SECRET=replace-with-a-long-random-secret
ALLOWED_ORIGIN=https://2026.synbioreactor.de
SPONSOR_API_PORT=3001
```

After deployment, assign a domain to the `sponsor-api` service. Save that URL for the frontend as `BACKEND_SPONSOR_API_URL`.

## Frontend App

Create a separate Coolify application for the Astro site.

Use these settings:

- Build pack: Dockerfile
- Dockerfile: `Dockerfile`
- Exposed port: `4321`
- Health check path: `/api/health`

Set this build-time variable before building:

```bash
SITE_URL=https://2026.synbioreactor.de
```

Set these runtime variables:

```bash
MAUTIC_BASE_URL=
MAUTIC_AUTH_TOKEN=
BACKEND_SPONSOR_API_URL=https://your-backend-stack.example.com
HOST=0.0.0.0
PORT=4321
```

`SITE_URL` must be available during the image build because Astro uses it for sitemap and robots output.

## Verification

Once both apps are deployed, verify the frontend health endpoint:

```bash
curl https://2026.synbioreactor.de/api/health
```

Expected shape:

```json
{
  "status": "ok",
  "service": "astro",
  "backend": {
    "sponsor": "ok"
  }
}
```

If the sponsor backend is not wired yet, the frontend still stays healthy and reports:

```json
{
  "status": "ok",
  "service": "astro",
  "backend": {
    "sponsor": "unconfigured"
  }
}
```

## Local Compose

For local frontend parity, copy `.env.example` to `.env`, fill values as needed, then run:

```bash
docker compose up --build
```

For the backend stack:

```bash
docker compose --env-file services/.env.example -f services/docker-compose.yml up --build
```

For a real local backend secret, create `services/.env` from `services/.env.example` and use that file instead.

## Future Services

Add future backend tools as sibling services in `services/docker-compose.yml`. Add a new frontend server-side connector in `src/lib/backend/config.ts`, then expose same-origin Astro proxy routes under `src/pages/api/` so browser code never needs direct cross-origin backend URLs.
