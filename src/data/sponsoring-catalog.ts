export interface CatalogFeature {
  label: string;
}

export interface CatalogPackage {
  id: string;
  name: string;
  description: string;
  defaultPrice: number | "custom";
  priceNote?: string;
  discount?: string;
  availability?: string;
  highlighted?: boolean;
  category: "main" | "visibility" | "program" | "digital" | "video" | "scholarship";
  features: CatalogFeature[];
}

export const sponsoringCatalog: CatalogPackage[] = [
  {
    id: "basic",
    name: "Basic Sponsorship",
    description: "Get started with essential visibility and networking",
    defaultPrice: 1000,
    priceNote: "excl. taxes",
    discount: "GASB members receive 20% off",
    category: "main",
    highlighted: true,
    features: [
      { label: "Featured in marketing materials and newsletter" },
      { label: "Share your promotional material (incl. company roll-up)" },
      { label: "1 free SynBioReactor ticket" },
      { label: "Access to exclusive lunch & speakers lounge" },
      { label: "May bring up to 2 guests to lounge" },
    ],
  },
  {
    id: "booth-regular-small",
    name: "Sponsor Booth (2×2m)",
    description: "Regular booth space at the event",
    defaultPrice: 1500,
    availability: "12 available",
    category: "visibility",
    features: [
      { label: "2 × 2 meter booth space" },
      { label: "Prime location at the event" },
    ],
  },
  {
    id: "booth-regular-large",
    name: "Sponsor Booth (4×2m)",
    description: "Large booth space for maximum impact",
    defaultPrice: 2500,
    availability: "6 available",
    category: "visibility",
    features: [
      { label: "4 × 2 meter booth space" },
      { label: "Premium location at the event" },
    ],
  },
  {
    id: "booth-startup",
    name: "Startup Booth",
    description: "Perfect for early-stage companies",
    defaultPrice: 500,
    availability: "12 available",
    category: "visibility",
    features: [
      { label: "Space for branded roll-up" },
      { label: "Table provided" },
    ],
  },
  {
    id: "event-banner",
    name: "Event Banner",
    description: "Large banner display at the venue",
    defaultPrice: 800,
    availability: "4 available",
    category: "visibility",
    features: [
      { label: "Large banner display" },
      { label: "High visibility placement" },
    ],
  },
  {
    id: "branded-lanyard",
    name: "Branded Lanyard + Badge",
    description: "Your brand on every attendee",
    defaultPrice: 1200,
    availability: "1 available",
    highlighted: true,
    category: "visibility",
    features: [
      { label: "Brand the lanyards worn by every attendee" },
      { label: "Brand the badges worn by every attendee" },
    ],
  },
  {
    id: "branded-session",
    name: "Host a Branded Session",
    description: "Lead a workshop or fireside chat",
    defaultPrice: 1500,
    discount: "Startups get 50% off",
    availability: "6 available",
    category: "program",
    features: [
      { label: "Workshop or fireside chat format" },
      { label: "Up to 80 participants" },
      { label: "Full content control" },
    ],
  },
  {
    id: "branded-session-addon",
    name: "Pre-Lunch Session Slot",
    description: "Extended visibility add-on",
    defaultPrice: 2000,
    availability: "1 available",
    highlighted: true,
    category: "program",
    features: [
      { label: "Schedule session before exclusive lunch" },
      { label: "Maximum visibility and engagement" },
      { label: "Premium time slot" },
    ],
  },
  {
    id: "main-stage-talk",
    name: "Main Stage Expert Talk",
    description: "Address the entire audience",
    defaultPrice: 2500,
    discount: "Startups get 50% off",
    availability: "3 available",
    category: "program",
    features: [
      { label: "Content-driven presentation" },
      { label: "Speak to entire audience" },
      { label: "Main stage presence" },
    ],
  },
  {
    id: "newsletter-promo",
    name: "Newsletter Promo Space",
    description: "Featured in our newsletter",
    defaultPrice: 800,
    availability: "5 available",
    category: "digital",
    features: [
      { label: "Dedicated space in SynBioReactor newsletter" },
      { label: "Reach our engaged subscriber base" },
    ],
  },
  {
    id: "linkedin-marketing",
    name: "Personalized LinkedIn Marketing",
    description: "Targeted social media exposure",
    defaultPrice: 800,
    category: "digital",
    features: [
      { label: "Tailored posts for your brand" },
      { label: "Shared with ~3000 SynBio enthusiasts" },
    ],
  },
  {
    id: "aftermovie",
    name: "Aftermovie Feature",
    description: "Be part of our official aftermovie",
    defaultPrice: 1500,
    availability: "1 available",
    highlighted: true,
    category: "video",
    features: [
      { label: "Brand feature in official aftermovie" },
      { label: "Long-lasting visibility" },
      { label: "Shared across all channels" },
    ],
  },
  {
    id: "personal-reel",
    name: "Personal SynBioReactor Reel",
    description: "Custom short video for your company",
    defaultPrice: 1000,
    availability: "3 available",
    category: "video",
    features: [
      { label: "Custom short video highlighting your company" },
      { label: "Shared on our social media" },
      { label: "Professional production" },
    ],
  },
  {
    id: "scholarship",
    name: "Award a Scholarship",
    description: "Support the next generation of scientists",
    defaultPrice: "custom",
    category: "scholarship",
    features: [
      { label: "Support young entrepreneurs, students, or PhD students" },
      { label: "Receive CVs, applications, and contact details" },
      { label: "Ability to choose scholarship recipients" },
      { label: "Recipients get free ticket + €150 travel credit" },
    ],
  },
];

export const categoryLabels: Record<CatalogPackage["category"], string> = {
  main: "Main Package",
  visibility: "On-Site Visibility",
  program: "Own the Spotlight",
  digital: "Digital Visibility",
  video: "Be Remembered",
  scholarship: "Award a Scholarship",
};

export const categorySubtitles: Partial<Record<CatalogPackage["category"], string>> = {
  visibility: "Make your brand stand out at the event",
  program: "Lead sessions and engage directly with attendees",
  digital: "Reach our community online",
  video: "Video exposure that lasts beyond the event",
  scholarship: "Invest in the future of synthetic biology",
};

export function getCatalogPackage(id: string): CatalogPackage | undefined {
  return sponsoringCatalog.find((pkg) => pkg.id === id);
}

export type PackageCategory = CatalogPackage["category"];

export interface OfferSectionLayout {
  id: PackageCategory;
  enabled: boolean;
  packageIds: string[];
}

export interface SponsorOfferLayout {
  sections: OfferSectionLayout[];
}

export interface SponsorOfferItem {
  packageId: string;
  price: number | "custom";
}

export interface SponsorOffer {
  id: string;
  code: string;
  companyName: string;
  title?: string;
  message?: string;
  items: SponsorOfferItem[];
  layout?: SponsorOfferLayout;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const sectionOrder: PackageCategory[] = [
  "main",
  "visibility",
  "program",
  "digital",
  "video",
  "scholarship",
];

export function buildDefaultLayout(items: SponsorOfferItem[]): SponsorOfferLayout {
  const grouped = new Map<PackageCategory, string[]>();
  for (const id of sectionOrder) {
    grouped.set(id, []);
  }

  for (const item of items) {
    const pkg = getCatalogPackage(item.packageId);
    if (!pkg) continue;
    const list = grouped.get(pkg.category) ?? [];
    list.push(item.packageId);
    grouped.set(pkg.category, list);
  }

  return {
    sections: sectionOrder.map((id) => ({
      id,
      enabled: (grouped.get(id)?.length ?? 0) > 0,
      packageIds: grouped.get(id) ?? [],
    })),
  };
}

export function resolveOfferLayout(offer: SponsorOffer): SponsorOfferLayout {
  if (offer.layout?.sections?.length) {
    const itemIds = new Set(offer.items.map((item) => item.packageId));
    return {
      sections: sectionOrder.map((id) => {
        const existing = offer.layout?.sections.find((section) => section.id === id);
        const packageIds = (existing?.packageIds ?? []).filter((pid) => itemIds.has(pid));
        return {
          id,
          enabled: existing?.enabled ?? packageIds.length > 0,
          packageIds,
        };
      }),
    };
  }
  return buildDefaultLayout(offer.items);
}
