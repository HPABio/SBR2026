---
name: SynBioReactor Summit 2026
description: Berlin's premier synthetic biology startup and investor summit — bold, dark, orange-lit.
colors:
  reactor-black: "#1e1e1e"
  ink-white: "#fafafa"
  synbio-orange: "#F49B2B"
  orange-bright: "#FE9D00"
  orange-nav: "#FF8800"
  orange-deep: "#D09A40"
  surface-card: "#2e2e2e"
  surface-muted: "#404040"
  muted-text: "#a3a3a3"
  ring-orange: "#F49B2B"
typography:
  display:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "12px"
  button: "12px"
  card: "28px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
  section: "128px"
components:
  button-primary:
    backgroundColor: "{colors.synbio-orange}"
    textColor: "{colors.reactor-black}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.orange-bright}"
    textColor: "{colors.reactor-black}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-outline:
    backgroundColor: "{colors.reactor-black}"
    textColor: "{colors.ink-white}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
  nav-link-active:
    textColor: "{colors.orange-nav}"
    typography: "{typography.label}"
---

# Design System: SynBioReactor Summit 2026

## 1. Overview

**Creative North Star: "The Reactor Chamber"**

SynBioReactor's visual system is a dark laboratory under heat — near-black surfaces charged with saturated orange energy at the edges and CTAs. The site should feel like walking into a high-stakes pitch room in Berlin: loud when it needs to be (hero stats, sponsor tiers, ticket buttons), precise everywhere else. Design *is* the product; sponsors and founders judge the summit by how the interface feels before they read a word.

Typography splits on contrast: **Anton** shouts in uppercase for display and section headers; **DM Sans** carries readable body copy and UI labels. Depth comes from glow, border light, and tonal layering on `#1e1e1e` — not from cream backgrounds or card-on-card nesting. Motion is confident (scale, glow shift, gradient bars) but never gates content behind reveal animations.

This system explicitly rejects generic SaaS landing pages, corporate institutional dull, over-animated gimmicks, and dry academic layouts — per PRODUCT.md anti-references.

**Key Characteristics:**
- Committed dark canvas with orange accent carrying 30–60% of visual energy on key surfaces
- Uppercase Anton display type at hero scale; body stays in DM Sans at 65–75ch max
- Glow and border-light as the signature depth language (BorderGlow, GlowButton, gradient CTAs)
- shadcn/Radix primitives for forms and dialogs; custom Astro/React components for brand moments
- Sponsors and partners surfaced prominently; CTAs reflect sponsors-first priority

## 2. Colors

A near-black reactor floor lit by synbio orange — committed, not restrained.

### Primary
- **SynBio Orange** (#F49B2B / oklch(0.72 0.15 55)): Primary CTAs, active nav links, stat numbers, accent words in headlines, ring/focus color. The brand's single committed accent.
- **Reactor Bright** (#FE9D00): Hover states on glow buttons, gradient highlights, secondary orange emphasis.
- **Nav Ember** (#FF8800): Active navigation link color; slightly hotter than primary for wayfinding.

### Secondary
- **Amber Depth** (#D09A40): Gradient stops on PremiumButton, glow orb secondary tones, warm shadow layers.

### Neutral
- **Reactor Black** (#1e1e1e / oklch(0.12 0 0)): Page background (`--background`). The default surface — never cream, never paper-white.
- **Ink White** (#fafafa / oklch(0.98 0 0)): Primary text on dark (`--foreground`).
- **Surface Card** (#2e2e2e / oklch(0.18 0 0)): Cards, popovers, elevated panels (`--card`).
- **Surface Muted** (#404040 / oklch(0.25 0 0)): Borders, inputs, secondary surfaces (`--border`, `--muted`).
- **Muted Text** (#a3a3a3 / oklch(0.65 0 0)): Supporting copy, nav default state. **Bump toward ink when contrast is close** — this is the most common AA failure on dark UI.

### Named Rules
**The One Heat Rule.** Orange appears on CTAs, active states, stat highlights, and deliberate accent words — not as ambient wash across entire sections. Full-width orange gradients (e.g. SBWC section) are allowed as hero moments; don't repeat on every block.

**The Dark Floor Rule.** Body background stays near-black. Warmth lives in accent + typography + imagery, not in cream/sand body tints.

## 3. Typography

**Display Font:** Anton (sans-serif fallback)
**Body Font:** DM Sans (sans-serif fallback)
**Accent Display:** Boldonse (sparingly, for subtitle/display alternates)

**Character:** Anton is industrial and loud — uppercase, tight tracking, built for event scale. DM Sans is clean and readable for descriptions, forms, and nav labels. Never pair Anton with another geometric sans at similar weight; the contrast axis is display vs. body.

### Hierarchy
- **Display** (400, clamp(2.5rem, 8vw, 6rem), 1.05): Hero headlines — "Meet this years speakers", registration hero, sponsoring flyer titles. Always uppercase with `font-anton`. Max clamp ceiling ~6rem.
- **Headline** (400, clamp(2rem, 5vw, 4.5rem), 1.1): Section titles, pitch stats, team headers. Uppercase Anton.
- **Title** (400, clamp(1.5rem, 3vw, 2.25rem), 1.2): Subsection headings, card titles, schedule day headers.
- **Body** (400, 1rem/16px, 1.6): Prose, descriptions, form labels. DM Sans or system sans. Cap line length at 65–75ch. Use `text-wrap: balance` on h1–h3, `text-wrap: pretty` on long prose.
- **Label** (500, 0.875rem/14px, 1.4): Nav links, button text (shadcn default), metadata. DM Sans.

### Named Rules
**The Anton Ceiling Rule.** Display headings use `clamp()` with a max of 6rem (~96px). Stats and decorative numerals may go larger (`text-[10rem]`) but only as isolated graphic elements, not body copy.

**The Uppercase Voice Rule.** Section display type is uppercase Anton. Body and labels are sentence case — never uppercase-tracked eyebrows on every section.

## 4. Elevation

This system conveys depth through **glow, border light, and tonal layering** — not traditional Material shadows. Cards sit one step lighter than background (`#2e2e2e` on `#1e1e1e`). The signature BorderGlow component builds multi-layer `box-shadow` from HSL orange tones with optional animated mesh gradients inside rounded containers (28px default radius).

Navigation uses `bg-background/95 backdrop-blur` with a 1px border — functional glass, not decorative glassmorphism elsewhere.

### Shadow Vocabulary
- **Glow hover** (`box-shadow: 0 0 24px color-mix(in oklab, #F49B2B 35%, transparent)`): GlowButton hover — ambient orange bloom.
- **Premium lift** (`box-shadow: 0 8px 28px color-mix(in oklab, #F49B2B 45%, transparent)`): PremiumButton hover — structural lift with brand color.
- **Border glow stack** (multi-layer HSL shadows via BorderGlow): Interactive cards and featured containers — edge-reactive, not static drop shadow.

### Named Rules
**The Glow-Not-Glass Rule.** Backdrop blur appears on nav and PremiumButton inner surface only. Do not default to frosted glass cards site-wide.

**The Flat-Until-Hover Rule.** Surfaces are tonally layered at rest. Glow intensifies on hover/focus — never bounce or elastic easing.

## 5. Components

### Buttons
- **Shape:** Medium rounding (10px / `rounded-md` for shadcn; 12px / `0.75rem` for brand buttons)
- **Primary (shadcn):** `bg-primary text-primary-foreground` — orange fill, dark text. Padding 8px 16px, h-9 default.
- **GlowButton:** Dark card fill, 2px orange border, blurred orange orbs behind. Hover: scale 1.05, border → #FE9D00, text → primary, glow shadow. Fixed footprint ~16rem × 4rem for hero CTAs.
- **PremiumButton:** Orange gradient wrapper (135deg #D09A40 → #F49B2B → #FE9D00), dark inner with backdrop-blur, orange label + optional sparkles icon. Hover: scale 1.05, brightness up, deeper gradient.
- **BubbleButton:** Primary fill, uppercase Anton label, liquid bubble animation on hover. Used for ticket CTAs in nav and hero.
- **Hover / Focus:** Scale transforms (1.05 max), color/border transitions 0.2–0.5s ease-out. Focus-visible: ring 3px at `{colors.ring-orange}` / 50% opacity (shadcn pattern).

### Cards / Containers
- **Corner Style:** shadcn default 10px (`--radius: 0.625rem`); BorderGlow signature 28px
- **Background:** `surface-card` (#2e2e2e) on `reactor-black`
- **Shadow Strategy:** BorderGlow or subtle border (`border-border`) — no nested cards
- **Border:** 1px `oklch(0.25 0 0)` default; 2px orange for featured/glow variants
- **Internal Padding:** 16px–32px; section vertical rhythm 128px (`py-32`) on major blocks

### Inputs / Fields
- **Style:** shadcn input — dark background matching `--input`, 1px border, 10px radius
- **Focus:** Ring at primary orange, 3px spread
- **Error / Disabled:** Destructive red (`oklch(0.577 0.245 27.325)`), 50% opacity when disabled

### Navigation
- **Style:** Fixed top, full width, h-16, `bg-background/95 backdrop-blur`, bottom border
- **Logo lockup:** Favicon + `#SBR2026` in Anton uppercase (hidden below lg)
- **Links:** 14px, muted-foreground default → `#FF8800` when active, foreground on hover
- **Mobile:** Slide/f drawer menu, Anton "Menu" label, BubbleButton ticket CTA preserved

### BorderGlow (Signature)
- **Purpose:** Featured cards, swap sections, premium content frames
- **Behavior:** Edge-reactive glow following pointer; optional animated mesh gradient fill; default glow color HSL `40 80 80` (warm orange family); 28px border radius
- **When to use:** One hero feature per section — not on every list item

## 6. Do's and Don'ts

### Do:
- **Do** keep the near-black canvas (`#1e1e1e`) as the default floor — warmth comes from orange accent and imagery.
- **Do** use Anton uppercase for display headlines and DM Sans for body; cap hero clamp at 6rem.
- **Do** use glow, border-light, and tonal layering for depth on dark surfaces.
- **Do** surface sponsor/partner value prominently — design reflects sponsors-first priority from PRODUCT.md.
- **Do** respect `prefers-reduced-motion` — crossfade or instant state changes, no bounce/elastic.
- **Do** verify muted text contrast on dark backgrounds; bump `#a3a3a3` toward ink when close to AA threshold.

### Don't:
- **Don't** use generic SaaS landing page patterns — cream backgrounds, gradient text (`background-clip: text`), identical icon-card grids, tiny uppercase eyebrows on every section.
- **Don't** ship corporate institutional dull — safe gray palettes, forgettable layouts, no personality.
- **Don't** use over-animated gimmicks — bounce/elastic easing, parallax overload, motion that gates content visibility behind reveal classes.
- **Don't** use dry academic styling — paper-white backgrounds, dense unbroken prose, no visual hierarchy.
- **Don't** use side-stripe borders (`border-left` > 1px colored accent on cards or callouts).
- **Don't** nest cards inside cards.
- **Don't** default to glassmorphism — blur is for nav and PremiumButton inner only.
- **Don't** drift toward "AI conference site" tropes — the dark + orange + glow direction is the anchor; evolve it, don't reboot it.
