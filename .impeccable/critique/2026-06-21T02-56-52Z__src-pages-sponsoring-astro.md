---
target: sponsoring
total_score: 24
p0_count: 0
p1_count: 3
p2_count: 2
timestamp: 2026-06-21T02-56-52Z
slug: src-pages-sponsoring-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Submit shows "Verifying…" — good — but unlocked packages live in a hidden container with no visible progress cue for first-time visitors |
| 2 | Match System / Real World | 3 | Access-code gate matches bespoke B2B sponsor offers; mailto fallback is appropriate |
| 3 | User Control and Freedom | 3 | "Use a different code" in packages view; sign-out event clears state |
| 4 | Consistency and Standards | 2 | Anton hero + Quicksand widetrack subtitle + shadcn card grid + gradient "Welcome!" breaks the Reactor Chamber system |
| 5 | Error Prevention | 2 | Required code field; API errors surfaced — no guard against empty team links |
| 6 | Recognition Rather Than Recall | 2 | Cold visitors must know they have a code; no public tier preview or sponsor proof |
| 7 | Flexibility and Efficiency | 1 | Invite-only path; no public compare/contact shortcut beyond mailto |
| 8 | Aesthetic and Minimalist Design | 2 | Hero is on-brand; post-gate package grid reads generic icon-card SaaS |
| 9 | Error Recovery | 3 | Clear API-unreachable message; inline error on invalid code |
| 10 | Help and Documentation | 2 | Single mailto line; no sponsorship FAQ or "what's included" for prospects |
| **Total** | | **24/40** | **Acceptable — significant sponsor-conversion gaps** |

## Anti-Patterns Verdict

**LLM assessment:** Not full AI slop — the Anton uppercase hero and dark canvas match SBR identity. The unlocked packages view and success overlay drift toward generic shadcn marketing (icon + card + checklist grid). The page undersells for PRODUCT.md's #1 goal (sponsor conversion) because most visitors see only a code gate and a team roster.

**Deterministic scan:** 1 finding — `gradient-text` in `SponsoringFlyerSuccess.astro` line 26 (`bg-clip-text` + gradient). Explicit DESIGN.md violation.

**Browser inspection:** Live page at `/sponsoring` confirms: hero form → (hidden packages) → team section. No package content visible without code. Invalid semantics: subtitle `<p>` nested inside `<h2>` in both `SponsoringFlyer.astro` and `TeamComponent.astro`. Eleven team avatar links use `href=""`. Browser overlay injection unavailable (read-only critique path).

## Overall Impression

The gate flow works for invited sponsors, but the page fails as a **sponsors-first** surface for anyone without a code. It reads like a private link destination stapled to a team block — not a page that sells Berlin's premier synbio summit to corporate partners.

## What's Working

1. **Access-code UX mechanics** — Verify state, localStorage persistence, cross-component sync via `sbr:sponsor-code`, and actionable API error copy are solid engineering.
2. **Hero tone** — "YOUR SPONSORSHIP / OFFER" in Anton with orange accent matches Reactor Chamber identity and feels event-scale.
3. **Tailored packages view** (when unlocked) — Company badge, total value, sectioned layout, and mailto CTAs with pre-filled subjects respect the bespoke-offer workflow.

## Priority Issues

### [P1] No public sponsor value proposition
**Why it matters:** PRODUCT.md ranks sponsor conversion #1. A corporate prospect landing from `/sponsoring` or the footer sees only a code field — no tiers, logos, reach stats, or "why sponsor SBR2026."
**Fix:** Add a public hero band above the gate: headline, 3 proof points (audience size, partner logos, last-year outcomes), and a primary "Request sponsorship info" CTA alongside the code entry.
**Suggested command:** `/impeccable craft sponsoring public hero`

### [P1] Package content hidden with no affordance
**Why it matters:** `#sponsoring-packages-container` is `hidden` until unlock. First-time visitors cannot discover what unlocks; cognitive load fails the "recognition" heuristic.
**Fix:** Show a blurred/teaser state, or a static "Example packages" section for unauthenticated visitors; reserve personalized pricing for post-code.
**Suggested command:** `/impeccable shape sponsoring page IA`

### [P1] Gradient text in success overlay
**Why it matters:** `SponsoringFlyerSuccess.astro` uses `bg-clip-text` gradient — absolute ban in DESIGN.md and confirmed by detector.
**Fix:** Replace with solid `text-foreground` or `text-primary` Anton/Boldonse heading.
**Suggested command:** `/impeccable quieter SponsoringFlyerSuccess`

### [P2] Invalid heading structure hurts a11y
**Why it matters:** `<p>` inside `<h2>` in flyer and team sections breaks screen reader outline; subtitle styled as widetrack Quicksand reads like a banned eyebrow kicker.
**Fix:** Split into `h2` + separate `p` subtitle; use DM Sans, sentence case, no `tracking-widest` eyebrow styling.
**Suggested command:** `/impeccable typeset sponsoring`

### [P2] Generic icon-card grid when unlocked
**Why it matters:** `PackageCard` uses Lucide icon + shadcn Card + checklist — matches PRODUCT anti-reference "identical icon-card grids."
**Fix:** Reframe 1–2 hero tiers with BorderGlow or PremiumButton CTAs; reduce icon repetition; lead with outcome copy not feature bullets.
**Suggested command:** `/impeccable bolder sponsoring-packages`

## Persona Red Flags

**Jordan (Confused First-Timer):** Lands on `/sponsoring`, sees "Enter your access code" with no explanation of what sponsorship includes. No visible help beyond mailto. Will leave to check `/partners` instead.

**Corporate Sponsor (project-specific):** Expects prestige signals (logos, attendee numbers, Berlin positioning) before engaging. Page provides none without a code — misaligned with sponsors-first strategy.

**Sam (Accessibility):** Nested `<p>` in `<h2>` breaks heading navigation. Team avatars are links with empty `href` — focusable but go nowhere. Muted Quicksand subtitle at `text-sm` on black may miss AA contrast.

**Casey (Mobile):** `text-8xl` on "OFFER" risks overflow on narrow viewports. Team grid of 11 small targets sits far below the fold after the gate. Sponsoring nav link hidden below `lg` in desktop nav pattern — mobile menu only.

## Minor Observations

- Dev-only "Open Sponsor Admin" link visible during local dev — ensure it never ships to production (currently gated by `isDev`).
- `animate-in fade-in zoom-in` on success overlay may lack `prefers-reduced-motion` alternative.
- Team section feels disconnected from sponsorship — consider moving below packages or reframing as "Your contacts" post-unlock.

## Questions to Consider

- What should a **prospect without a code** see — full public tiers, or a contact funnel only?
- Should the team block serve sponsors (named contacts) or is it generic site filler?
- When packages unlock, does one BorderGlow-framed "recommended tier" beat a grid of equal cards?
