export type ComponentKind = "react" | "astro"

/** `compact` = up to 3 per row; `full` = dedicated row */
export type ComponentLayout = "compact" | "full"

/** How wide the centered preview stage should be inside a full row */
export type PreviewWidth = "content" | "wide" | "full"

export interface ComponentRegistryEntry {
  id: string
  name: string
  category: string
  path: string
  type: ComponentKind
  tags: string[]
  description: string
  layout?: ComponentLayout
  previewWidth?: PreviewWidth
}

export const componentRegistry: ComponentRegistryEntry[] = [
  {
    id: "pricing-five",
    name: "Pricing Five",
    category: "Pricing",
    path: "src/components/ui/pricing-five.tsx",
    type: "react",
    tags: ["shadcn", "tailwind", "tailark"],
    description: "Single-plan pricing section with monthly/annual pill toggle.",
    layout: "full",
    previewWidth: "wide",
  },
  {
    id: "pricing-module",
    name: "Pricing Module",
    category: "Pricing",
    path: "src/components/ui/pricing-module.tsx",
    type: "react",
    tags: ["shadcn", "multi-plan"],
    description: "Four-column pricing grid with annual billing switch.",
    layout: "full",
    previewWidth: "wide",
  },
  {
    id: "glow-button",
    name: "Glow Button",
    category: "Buttons",
    path: "src/components/ui/GlowButton.astro",
    type: "astro",
    tags: ["astro", "zero-js"],
    description: "Primary CTA button with animated glow border.",
  },
  {
    id: "premium-button",
    name: "Premium Button",
    category: "Buttons",
    path: "src/components/ui/PremiumButton.astro",
    type: "astro",
    tags: ["astro", "zero-js"],
    description: "Premium-styled button with layered shadow treatment.",
  },
  {
    id: "elastic-checkbox",
    name: "Elastic Checkbox",
    category: "Forms",
    path: "src/components/ui/ElasticCheckbox.astro",
    type: "astro",
    tags: ["astro", "forms", "zero-js"],
    description: "Checkbox with elastic spring animation on toggle.",
  },
  {
    id: "border-glow",
    name: "Border Glow",
    category: "Effects",
    path: "src/components/BorderGlow.tsx",
    type: "react",
    tags: ["interactive", "cursor", "mesh"],
    description: "Cursor-reactive conic mesh border with animated sweep.",
    layout: "full",
    previewWidth: "content",
  },
  {
    id: "lab1-appearance-modal",
    name: "Lab01 Appearance Modal",
    category: "Lab01",
    path: "src/components/ui/lab1-appearance-modal.tsx",
    type: "react",
    tags: ["lab01", "glass", "modal"],
    description: "Glass appearance settings panel with bevel borders.",
  },
  {
    id: "lab1-action-menu",
    name: "Lab01 Action Menu",
    category: "Lab01",
    path: "src/components/ui/lab1-action-menu.tsx",
    type: "react",
    tags: ["lab01", "menu"],
    description: "Floating action menu with Lab01 shadow ladder styling.",
  },
  {
    id: "lab1-context-menu",
    name: "Lab01 Context Menu",
    category: "Lab01",
    path: "src/components/ui/lab1-context-menu.tsx",
    type: "react",
    tags: ["lab01", "menu"],
    description: "Context menu demo with film grain and glass surfaces.",
  },
  {
    id: "lab1-timeline",
    name: "Lab01 Timeline",
    category: "Lab01",
    path: "src/components/ui/lab1-timeline.tsx",
    type: "react",
    tags: ["lab01", "timeline"],
    description: "Vertical timeline with Lab01 typography and markers.",
    layout: "full",
    previewWidth: "content",
  },
  {
    id: "lab1-clock",
    name: "Lab01 Clock",
    category: "Lab01",
    path: "src/components/ui/lab1-clock.tsx",
    type: "react",
    tags: ["lab01", "clock"],
    description: "Analog-style clock widget with glass bezel styling.",
  },
  {
    id: "luminous-card",
    name: "Luminous Card",
    category: "Cards",
    path: "src/components/ui/luminous-card.tsx",
    type: "react",
    tags: ["interactive", "light"],
    description: "Card with slit-light reveal animation on interaction.",
  },
  {
    id: "gradient-bars",
    name: "Gradient Bars",
    category: "Backgrounds",
    path: "src/components/ui/gradient-bars.tsx",
    type: "react",
    tags: ["motion", "background"],
    description: "Animated vertical gradient bars background effect.",
    layout: "full",
    previewWidth: "full",
  },
  {
    id: "grid-list-02",
    name: "Grid List 02",
    category: "Lists",
    path: "src/components/ui/grid-list-02.tsx",
    type: "react",
    tags: ["shadcn", "avatar", "card"],
    description: "Team member grid list with avatars and role metadata.",
    layout: "full",
    previewWidth: "wide",
  },
  {
    id: "shadcn-primitives",
    name: "Shadcn Primitives",
    category: "Shadcn",
    path: "src/components/ui/button.tsx",
    type: "react",
    tags: ["shadcn", "button", "badge", "card"],
    description: "Button, badge, and card primitive composition sample.",
  },
]

export function getRegistryEntry(id: string) {
  return componentRegistry.find((entry) => entry.id === id)
}
