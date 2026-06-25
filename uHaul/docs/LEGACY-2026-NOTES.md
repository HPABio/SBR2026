# SBR 2026 legacy archive — what changed

Reference for understanding what **stays** in SBR-AstroPage vs what **moves** to SBR27.

## Homepage (archive mode)

The live homepage at `2026.synbioreactor.de` is now a recap hub:

1. `LegacyHero` — past-tense thank-you, no ticket CTA
2. `SBWCSection` + `LookingBackHeadline` — “Looking back at” with text-masked stars
3. `LegacyPhotoGallery` — curated event photos
4. `LegacyVideoRecap` — recap video + stats
5. `LegacyProgramSummary` — two-day program prose
6. `LegacyPitchSummary` — brief pitch contest note (full Pitch Perfect page deferred)
7. `LegacyAttendeeLinks` — picture depot (placeholder), speakers, SBR 2027, GASB, newsletter
8. `LegacyNewsletter` — Mautic email signup

Components live in `src-patterns/components/legacy/` in this pack.

## Navigation removed

These links were stripped from nav/footer site-wide:

- `/registration`, `/ticket`, `/sponsoring`, `/pitchPerfect` (nav only — pitch page kept for later work)
- SwapCard external URLs
- Ticket Tailor widgets

**Kept in nav:** Home, Time Table, Partners  
**Kept as pages (delinked):** `/speakers`, `/about`, `/partners`, `/timetable`

## Timetable

- SwapCard iframe removed entirely
- Two custom schedules mounted **hidden** on `/timetable` for visual comparison:
  - `ScheduleV1.tsx`
  - `V0event-schedule.tsx`
- Session reference data: `data/swapCardExpSessions_Dec17.json`

## Backends removed from archive repo

Deleted during legacy conversion:

| Removed | Was used for |
|---------|----------------|
| `apiCustom/` | Sponsor verification API |
| `email-service/` | Flyer SMTP |
| `render-service/` | Playwright social card PNGs |
| `SBRBackend/` | Ticket Tailor, SwapCard, Mautic proxies |
| Social render API routes | Admin social media builder |
| Sponsoring flyer/components | Partner PDF generation |

**Kept:** Newsletter via Mautic (`/api/newsletter/subscribe`)

## Coolify work (carried to SBR27)

The sponsor API was **re-extracted** into `services/sponsor-api/` with:

- Frontend connectors in `src/lib/backend/`
- Astro proxy routes under `src/pages/api/sponsoring/`
- Two-app Coolify deployment docs

This is the pattern SBR27 should adopt for sponsoring and future services.

## Branch note

`impeccable-audit` branch was left untouched — it contains sponsoring UI experiments **not** merged to main. SBR27 should implement sponsoring fresh using `services/sponsor-api` + V0 partner template reference.
