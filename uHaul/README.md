# uHaul — SBR27 migration pack

Portable copies of the assets, patterns, and instruction files built during the SBR-AstroPage work (legacy 2026 archive, Coolify split deployment, design system, and SBR27 planning). Copy this folder into the new **SBR27** repo as a starting reference, then wire paths to match the fresh project layout.

## Repo split (context)

| Repo / domain | Role |
|---------------|------|
| **SBR-AstroPage** (this repo) | `2026.synbioreactor.de` — static archive of SBR 2026 |
| **SBR27** (new repo) | `synbioreactor.de` — live 2027 summit site + services |

The 2026 archive intentionally strips registration, tickets, SwapCard, and most API surfaces. SBR27 should be a **clean monorepo** with Astro SSR frontend + Docker Compose backend stack on Coolify.

## Folder map

```
uHaul/
├── README.md                 ← you are here
├── docs/                     ← architecture & deployment instructions
├── design/                   ← DESIGN.md + machine-readable tokens
├── deploy/                   ← Dockerfile, compose, Coolify runbook, config refs
├── services/                 ← sponsor-api backend stack (Bun/Express)
├── src-patterns/             ← copy-paste Astro/React patterns (not a full app)
├── assets/                   ← branding, partner logos, key venue/bg images
├── data/                     ← JSON seeds (speakers, sessions, partners list)
└── templates/v0-partner-page/  ← V0 Next.js partner page scaffold (reference)
```

## What to copy into SBR27 first

### 1. Design system

| Source | Use in SBR27 |
|--------|----------------|
| `design/DESIGN.md` | Human-readable brand spec (colors, type, components) |
| `design/design.json` | Impeccable / token tooling |
| `src-patterns/styles/global.css` | Tailwind v4 theme tokens, fonts, animations |
| `assets/branding/SBR-LogoTitle-2027-concept.png` | 2027 logo direction |
| `assets/branding/*` | Favicon, hero illustration, 2026 title lockup |

Update copy from “2026” → “2027” and point `SITE_URL` at `https://synbioreactor.de`.

### 2. Deployment (Coolify VPS)

| Source | Use in SBR27 |
|--------|----------------|
| `docs/SBR27-ARCHITECTURE.md` | Recommended repo layout & two-app Coolify topology |
| `deploy/coolify/README.md` | Step-by-step Coolify app setup |
| `deploy/docker/Dockerfile` | Astro SSR on Bun, healthcheck on `/api/health` |
| `deploy/docker/docker-compose.yml` | Local frontend parity |
| `services/docker-compose.yml` | Backend stack (sponsor-api + volume) |
| `deploy/astro.config.mjs` | Reference Astro 6 + Node adapter + sitemap |

**Two Coolify apps:** frontend (root Dockerfile, port 4321) + backend (`services/docker-compose.yml`, port 3001).

### 3. Backend connector pattern

Browser code should **never** call backend URLs directly. Same-origin Astro API routes proxy to services via env vars.

| Source | Target path in SBR27 |
|--------|----------------------|
| `src-patterns/lib/backend/config.ts` | `src/lib/backend/config.ts` |
| `src-patterns/lib/backend/server-fetch.ts` | `src/lib/backend/server-fetch.ts` |
| `src-patterns/pages/api/health.ts` | `src/pages/api/health.ts` |
| `src-patterns/pages/api/sponsoring/*` | `src/pages/api/sponsoring/*` |
| `src-patterns/pages/api/newsletter/subscribe.ts` | `src/pages/api/newsletter/subscribe.ts` |
| `src-patterns/env.d.ts` | `src/env.d.ts` |

Key env vars:

```bash
SITE_URL=https://synbioreactor.de          # build-time
BACKEND_SPONSOR_API_URL=https://api...     # runtime, backend stack URL
MAUTIC_BASE_URL=                           # newsletter
MAUTIC_AUTH_TOKEN=
ADMIN_SECRET=                              # sponsor-api only
```

### 4. Sponsor API service

Full stack under `services/sponsor-api/`:

- `server.js` — Express API (catalog, email capture, verify-code)
- `data/*.json` — seed files (replace with real 2027 catalog)
- `Dockerfile` — Bun runtime, `/health` check

Add future mini-services as siblings in `services/docker-compose.yml` and register them in `config.ts`.

### 5. UI patterns worth reusing

| Component | Notes |
|-----------|--------|
| `src-patterns/components/LookingBackHeadline.tsx` | White text + stars clipped via `mix-blend-multiply` |
| `src-patterns/components/ui/stars-background.tsx` | `compact` mode for headline-sized effects |
| `src-patterns/components/legacy/*` | Archive homepage sections — adapt for 2027 pre-event funnel |
| `src-patterns/lib/utils.ts` | `cn()` helper for shadcn-style components |

### 6. Data & assets

| Path | Contents |
|------|----------|
| `data/partnersLogoList.json` | Partner logo manifest |
| `data/speakerPage.json` | Speaker page content |
| `data/swapCardExpSessions_Dec17.json` | Real 2026 session data (timetable reference) |
| `data/swapCardExpSpeakers_Dec17.json` | Speaker export |
| `assets/logos/` | Partner & sponsor logo files |
| `templates/v0-partner-page/` | V0 Next.js partner/sponsor UI reference |

### 7. Large media (not copied)

These stay in SBR-AstroPage `src/assets/` — copy manually if SBR27 needs them:

- `SBR2026_WebPage_Hero.mp4`
- `RecapVideoSBR2025.mp4` / `SBR2025_Recap_video.mp4`
- `ExportWP/photos/*` (full event photo set)
- `imagesTeam/*` (team portraits)

## Suggested SBR27 repo skeleton

```
SBR27/
├── apps/web/              # Astro site (or root src/ if you prefer flat)
├── services/
│   ├── docker-compose.yml
│   └── sponsor-api/
├── deploy/coolify/
├── Dockerfile
├── docker-compose.yml
├── design/                # from uHaul/design
└── public/assets/         # from uHaul/assets
```

Flat root (`src/` at top level) also works — match whatever you used in the Coolify runbook.

## Intentionally left behind

Do **not** carry these from the old pre-legacy site:

- SwapCard iframe components and export scripts
- Ticket Tailor / registration flows
- `apiCustom/`, `SBRBackend/`, `render-service/`, `email-service/` (removed during legacy conversion)
- Nested `AstroPage/` submodule / recovery worktrees
- `impeccable-audit` branch sponsoring UI experiments

## Source conversations

This pack reflects work from:

1. **SBR 2026 legacy conversion** — archive homepage, nav cleanup, timetable swap
2. **Coolify split deployment** — two-app topology, sponsor-api extraction, backend connectors
3. **Looking Back headline FX** — compact stars + blend-mode text mask
4. **SBR27 architecture** — fresh monorepo vs multi-repo recommendation

---

*Generated from SBR-AstroPage on 2026-06-23. Copy the whole `uHaul/` folder into SBR27, then delete or relocate once integrated.*
