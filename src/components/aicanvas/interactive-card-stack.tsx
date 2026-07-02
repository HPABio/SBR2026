'use client'
import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, type PanInfo } from 'framer-motion';
import img0Raw from '@/assets/eventImages/DSC07564.jpg';
import img1Raw from '@/assets/eventImages/DSC00655.jpg';
import img2Raw from '@/assets/eventImages/DSC00237.jpg';
import img3Raw from '@/assets/eventImages/DSC07489.jpg';
import img4Raw from '@/assets/eventImages/DSC07586.jpg';

// Astro image imports typically return an object with a src property, whereas Vite might return a string.
// This helper ensures we get the string URL and fixes unencoded spaces in local dev paths.
const getSrc = (img: any) => {
  const url = img?.src || img
  if (typeof url === 'string') {
    return url.replace(/ /g, '%20')
  }
  return url
}

const staticImages = [
  getSrc(img0Raw),
  getSrc(img1Raw),
  getSrc(img2Raw),
  getSrc(img3Raw),
  getSrc(img4Raw),
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface Card {
  id: number
  orientation: 'portrait' | 'square'
  title?: string
  image: string
  // Optional. Set this to turn the top-right chip into a real link (opens in a
  // new tab). Left unset on every demo card below, so the chip is a decorative
  // affordance with no action. This is the seam for embedding your own links.
  href?: string
}

interface Slot {
  x: number
  y: number
  rotate: number
  scale: number
  zIndex: number
}

const cardTitles = [
  'Favourite #SBR2026  Moments', // Center (Slot 0)
  'Me too!',                    // Front right (Slot 1)
  'Click Me!',                  // Left front (Slot 2)
  'And Click Me Too!',          // Bottom right (Slot 3)
  'Yes, Me Too!',               // Bottom left (Slot 4)
];

const initialCards: Card[] = staticImages.map((img, idx) => ({
  id: idx,
  orientation: 'square',
  title: cardTitles[idx] || 'Event Moment',
  image: img,
}));

// ─── Slot tables ──────────────────────────────────────────────────────────────
// Slot 0 is the focused front card. Slots 1-6 scatter behind it. The mobile
// table tightens the spread so all 7 cards remain visible at narrow widths.

const SLOTS_DESKTOP: Slot[] = [
  { x:    0, y:   0, rotate:  1.5, scale: 1.00, zIndex: 70 },
  { x:  240, y: -45, rotate:  12,  scale: 0.90, zIndex: 60 },
  { x: -225, y: -15, rotate: -14,  scale: 0.89, zIndex: 50 },
  { x:  135, y: 105, rotate:  8,   scale: 0.86, zIndex: 40 },
  { x: -165, y:  90, rotate: -9,   scale: 0.84, zIndex: 30 },
]

const SLOTS_MOBILE: Slot[] = [
  { x:   0, y:   0, rotate:  1,   scale: 1.00, zIndex: 70 },
  { x: 135, y: -22, rotate:  6,   scale: 0.92, zIndex: 60 },
  { x:-127, y:  30, rotate: -7,   scale: 0.91, zIndex: 50 },
  { x:  82, y:  52, rotate:  4,   scale: 0.88, zIndex: 40 },
  { x: -82, y:  37, rotate: -4.5, scale: 0.87, zIndex: 30 },
]

// ─── Motion + chrome constants (hoisted so identities stay stable) ──────────────

const SPRING = { type: 'spring' as const, stiffness: 280, damping: 26 }
const MOUNT_SPRING = { type: 'spring' as const, stiffness: 200, damping: 22 }
const STAGGER_S = 0.08

const BREATH_Y_FOCUS = [0, -4, 0, 3, 0]
const BREATH_Y_REST = [0, -2, 0, 2, 0]
const BREATH_ROTATE_FOCUS = [0, 0.5, 0, -0.5, 0]
const BREATH_ROTATE_REST = [0, 0.3, 0, -0.3, 0]

const SHADOW_FOCUS = '0 24px 48px rgba(0,0,0,0.28), 0 6px 14px rgba(0,0,0,0.16)'
const SHADOW_REST = '0 12px 28px rgba(0,0,0,0.18), 0 4px 8px rgba(0,0,0,0.12)'

// Visible focus ring, matched to the olive accent.
const RING = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8B94D]'

const TITLE_STYLE: CSSProperties = {
  width: '80%',
  margin: 0,
  // Reserve room for the absolutely-positioned open button so the title never
  // reflows when the button appears on the focused card.
  marginRight: "auto",
  marginLeft: "auto",
  textWrap: 'wrap',
  fontFamily: 'var(--font-sans, sans-serif)',
  fontWeight: 600,
  fontSize: '15px',
  lineHeight: 1.3,
  letterSpacing: '-0.01em',
  color: '#A7A7AE',
  textAlign: 'center',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  minHeight: '2.6em',
}

const CHIP_POSITION: CSSProperties = { position: 'absolute', top: 10, right: 10, lineHeight: 0 }

const CHIP_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'clamp(28px, 7.5vw, 36px)',
  height: 'clamp(28px, 7.5vw, 36px)',
  backgroundColor: '#141312',
  borderRadius: 11,
  boxShadow: '0 8px 18px rgba(0,0,0,0.42), 0 3px 6px rgba(0,0,0,0.30)',
}

// The dark chip with the open-arrow glyph, shared by the link and no-op variants.
const OpenChip = (
  <span style={CHIP_STYLE}>
    <svg
      width="56%"
      height="56%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F5F1E8"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 L17 7" />
      <path d="M9 7 H17 V15" />
    </svg>
  </span>
)

// ─── InteractiveCardStack ───────────────────────────────────────────────────────

export interface InteractiveCardStackProps {
  /**
   * Multiplier to scale the size of the cards and the overall component height.
   * Default is 1.
   */
  scale?: number;
}

export default function InteractiveCardStack({ scale = 1 }: InteractiveCardStackProps = {}) {
  // order[slotIndex] = cardId. order[0] is always the focused front card.
  const [order, setOrder] = useState<number[]>([0, 1, 2, 3, 4])
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [cards, setCards] = useState<Card[]>(initialCards)

  // Scopes the arrow-key handler so it only fires when focus is inside the
  // widget, so the host page keeps its own arrow-key behaviour.
  const containerRef = useRef<HTMLDivElement | null>(null)
  // Separates a tap (< 8px) from a drag on the focused card.
  const dragDelta = useRef(0)

  const reduceMotion = useReducedMotion()

  useEffect(() => {
    // Hydrate cards on mount to avoid SSR mismatch
    setCards(staticImages.map((img, idx) => ({
      id: idx,
      orientation: 'square',
      title: cardTitles[idx] || (idx === 0 ? 'Favourite #SBR2026 Moments' : '#SBR26 Moments'),
      image: img,
    })))
    setMounted(true)
  }, [])

  // Mobile breakpoint: flip slot table below 640px.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 640px)')
    const apply = () => setIsMobile(!mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // Bring a card to slot 0. The rest of the order rotates so the previous
  // trailing cards keep their relative order behind it.
  const focusCard = useCallback((cardId: number) => {
    setOrder((prev) => {
      const idx = prev.indexOf(cardId)
      if (idx <= 0) return prev
      return [cardId, ...prev.slice(0, idx), ...prev.slice(idx + 1)]
    })
  }, [])

  // Cycle focus by ±1 with wrap. +1 → next (front card moves to the back),
  // -1 → previous (back card comes to the front).
  const step = useCallback((dir: 1 | -1) => {
    setOrder((prev) =>
      dir === 1
        ? [...prev.slice(1), prev[0]]
        : [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)],
    )
  }, [])

  // Arrow keys cycle focus, but ONLY while focus is inside the widget so the
  // page's own Left/Right behaviour (caret, scroll, native controls) is intact.
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      const root = containerRef.current
      if (!root || !root.contains(document.activeElement)) return
      event.preventDefault()
      step(event.key === 'ArrowRight' ? 1 : -1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [step])

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const distance = info.offset.x
      const velocity = info.velocity.x
      if (distance < -80 || velocity < -400) step(1)
      else if (distance > 80 || velocity > 400) step(-1)
    },
    [step],
  )

  const slots = isMobile ? SLOTS_MOBILE : SLOTS_DESKTOP
  const frontCardId = order[0]
  const frontTitle = cards.find((c) => c.id === frontCardId)?.title ?? ''

  return (
    <div className="flex w-full items-center justify-center px-4">
      <div ref={containerRef} className="relative flex w-full max-w-4xl flex-col items-center gap-10 py-12">
        {/* Stage: overflow-hidden so the scattered, rotated cards never spill
            past the container and trigger a horizontal page scrollbar. */}
        <div
          role="group"
          aria-label="Interactive card stack"
          aria-describedby="ics-hint"
          className="relative flex w-full select-none items-center justify-center overflow-visible"
          style={{ perspective: '1400px', height: `clamp(${416 * scale}px, ${57 * scale * 0.3}vw, ${572 * scale}px)` }}
        >
          {cards.map((card) => {
            const slotIndex = order.indexOf(card.id)
            const slot = slots[slotIndex]
            const isFocus = slotIndex === 0
            const issquare = card.orientation === 'square'

            // Entrance stagger (outer cards land first, focus lands last);
            // skipped entirely under reduced motion.
            const transition =
              !reduceMotion && !mounted
                ? { ...MOUNT_SPRING, delay: slotIndex * STAGGER_S }
                : SPRING

            const widthClass = issquare
              ? isMobile
                ? 'w-[clamp(260px,78vw,338px)]'
                : 'w-[clamp(286px,36vw,416px)]'
              : isMobile
                ? 'w-[clamp(169px,54vw,234px)]'
                : 'w-[clamp(208px,26vw,286px)]'

            // Breathing is suppressed for reduced-motion users.
            const breathY = reduceMotion ? 0 : isFocus ? BREATH_Y_FOCUS : BREATH_Y_REST
            const breathRotate = reduceMotion
              ? 0
              : isFocus
                ? BREATH_ROTATE_FOCUS
                : BREATH_ROTATE_REST

            return (
              <motion.div
                key={card.id}
                tabIndex={0}
                // Only back cards are activatable controls. The focused card has
                // no action (it is dragged, not clicked), so it is not a button.
                role={isFocus ? undefined : 'button'}
                aria-label={
                  isFocus
                    ? `${card.title ?? 'Card'}, current. Drag or use the arrow keys to change cards.`
                    : `Show ${card.title ?? `card ${card.id + 1}`}`
                }
                onClick={
                  isFocus
                    ? undefined
                    : (event) => {
                        event.preventDefault()
                        if (Math.abs(dragDelta.current) >= 8) return
                        focusCard(card.id)
                      }
                }
                onKeyDown={
                  isFocus
                    ? undefined
                    : (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          focusCard(card.id)
                        }
                      }
                }
                onPointerDown={() => {
                  dragDelta.current = 0
                }}
                drag={isFocus ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDrag={(_, info) => {
                  dragDelta.current = info.offset.x
                }}
                onDragEnd={handleDragEnd}
                className={`absolute rounded-sm outline-none ${isFocus ? '' : RING}`}
                // z-index follows the slot, so a flicked card drops behind the
                // others the instant it is released and slides under them as it
                // travels to the rear (no late, visible z-index swap).
                style={{ cursor: isFocus ? 'grab' : 'pointer', zIndex: slot.zIndex }}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.5 * scale, y: 60 * scale }}
                animate={{ x: slot.x * scale, y: slot.y * scale, rotate: slot.rotate, scale: slot.scale * scale, opacity: 1 }}
                transition={transition}
                whileTap={isFocus ? { cursor: 'grabbing' } : undefined}
              >
                {/* Middle layer owns the breathing loop AND the polaroid
                    chrome, so frame, shadow, title, and image move as one unit. */}
                <motion.div
                  className="relative flex flex-col rounded-sm ring-1 ring-black/[0.08] dark:ring-white/[0.12] w-[220px] md:w-[250px] lg:w-[280px]"
                  style={{ backgroundColor: '#FFFFFF', padding: '7px', boxShadow: isFocus ? SHADOW_FOCUS : SHADOW_REST }}
                  animate={{ y: breathY, rotate: breathRotate }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 7 + card.id * 0.6, repeat: Infinity, ease: 'easeInOut' }
                  }
                >
                  {/* Dark-mode paper colour overlay, pinned inside the frame. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0  dark:bg-[#F5F5F0]"
                  />


                  {/* Image well: rounded, clipped, aspect-locked. The focused
                      image loads eagerly at high priority (it is the LCP hero);
                      the rest defer. */}
                  <div
                    className="relative w-full overflow-hidden mt-3"
                    style={{ borderRadius: 5, aspectRatio: '1/1',  }}
                  >
                    <img
                      src={card.image}
                      alt=""
                      loading={isFocus ? 'eager' : 'lazy'}
                      fetchPriority={isFocus ? 'high' : 'low'}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>

                  {card.title && (
                    <div style={{ position: 'relative', padding: '14px 12px 8px 12px' }}>
                      <p style={TITLE_STYLE}>{card.title}</p>

                      {/* Chip completely removed per user request */}
                    </div>
                  )}

                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Announce the front-card change to assistive tech. */}
        <p className="sr-only" aria-live="polite">
          {frontTitle ? `${frontTitle} in focus` : ''}
        </p>
      </div>
    </div>
  )
}
