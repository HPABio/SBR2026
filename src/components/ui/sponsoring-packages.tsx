"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Users, Eye, Award, Video, Megaphone, MapPin, Ticket, Gift, Mic, Star, Mail, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
export interface PackageFeature {
  label: string;
}

export interface SponsorPackage {
  id: string;
  name: string;
  description: string;
  price: number | string;
  priceNote?: string;
  discount?: string;
  availability?: string;
  features: PackageFeature[];
  highlighted?: boolean;
  icon?: React.ReactNode;
  category: "main" | "visibility" | "program" | "digital" | "video" | "scholarship";
}

// Package Data
export const sponsorshipPackages: SponsorPackage[] = [
  // Main Package
  {
    id: "basic",
    name: "Basic Sponsorship",
    description: "Get started with essential visibility and networking",
    price: 1000,
    priceNote: "excl. taxes",
    discount: "GASB members receive 20% off",
    category: "main",
    highlighted: true,
    icon: <Star className="w-6 h-6" />,
    features: [
      { label: "Featured in marketing materials and newsletter" },
      { label: "Share your promotional material (incl. company roll-up)" },
      { label: "1 free SynBioReactor ticket" },
      { label: "Access to exclusive lunch & speakers lounge" },
      { label: "May bring up to 2 guests to lounge" },
    ],
  },
];

export const visibilityPackages: SponsorPackage[] = [
  {
    id: "booth-regular-small",
    name: "Sponsor Booth (2×2m)",
    description: "Regular booth space at the event",
    price: 1500,
    availability: "12 available",
    category: "visibility",
    icon: <MapPin className="w-5 h-5" />,
    features: [
      { label: "2 × 2 meter booth space" },
      { label: "Prime location at the event" },
    ],
  },
  {
    id: "booth-regular-large",
    name: "Sponsor Booth (4×2m)",
    description: "Large booth space for maximum impact",
    price: 2500,
    availability: "6 available",
    category: "visibility",
    icon: <MapPin className="w-5 h-5" />,
    features: [
      { label: "4 × 2 meter booth space" },
      { label: "Premium location at the event" },
    ],
  },
  {
    id: "booth-startup",
    name: "Startup Booth",
    description: "Perfect for early-stage companies",
    price: 500,
    availability: "12 available",
    category: "visibility",
    icon: <MapPin className="w-5 h-5" />,
    features: [
      { label: "Space for branded roll-up" },
      { label: "Table provided" },
    ],
  },
  {
    id: "event-banner",
    name: "Event Banner",
    description: "Large banner display at the venue",
    price: 800,
    availability: "4 available",
    category: "visibility",
    icon: <Eye className="w-5 h-5" />,
    features: [
      { label: "Large banner display" },
      { label: "High visibility placement" },
    ],
  },
  // {
  //   id: "branded-carpet",
  //   name: "Branded Carpet",
  //   description: "Custom carpet with your logo",
  //   price: 800,
  //   availability: "4 available",
  //   category: "visibility",
  //   icon: <Eye className="w-5 h-5" />,
  //   features: [
  //     { label: "Custom carpet with logo" },
  //     { label: "Placed in high-traffic location" },
  //   ],
  // },
  {
    id: "branded-lanyard",
    name: "Branded Lanyard + Badge",
    description: "Your brand on every attendee",
    price: 1200,
    availability: "1 available",
    highlighted: true,
    category: "visibility",
    icon: <Ticket className="w-5 h-5" />,
    features: [
      { label: "Brand the lanyards worn by every attendee" },
      { label: "Brand the badges worn by every attendee" },
    ],
  },
];

export const programPackages: SponsorPackage[] = [
  {
    id: "branded-session",
    name: "Host a Branded Session",
    description: "Lead a workshop or fireside chat",
    price: 1500,
    discount: "Startups get 50% off",
    availability: "6 available",
    category: "program",
    icon: <Mic className="w-5 h-5" />,
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
    price: 2000,
    availability: "1 available",
    highlighted: true,
    category: "program",
    icon: <Mic className="w-5 h-5" />,
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
    price: 2500,
    discount: "Startups get 50% off",
    availability: "3 available",
    category: "program",
    icon: <Megaphone className="w-5 h-5" />,
    features: [
      { label: "Content-driven presentation" },
      { label: "Speak to entire audience" },
      { label: "Main stage presence" },
    ],
  },
];

export const digitalPackages: SponsorPackage[] = [
  {
    id: "newsletter-promo",
    name: "Newsletter Promo Space",
    description: "Featured in our newsletter",
    price: 800,
    availability: "5 available",
    category: "digital",
    icon: <Mail className="w-5 h-5" />,
    features: [
      { label: "Dedicated space in SynBioReactor newsletter" },
      { label: "Reach our engaged subscriber base" },
    ],
  },
  {
    id: "linkedin-marketing",
    name: "Personalized LinkedIn Marketing",
    description: "Targeted social media exposure",
    price: 800,
    category: "digital",
    icon: <Linkedin className="w-5 h-5" />,
    features: [
      { label: "Tailored posts for your brand" },
      { label: "Shared with ~3000 SynBio enthusiasts" },
    ],
  },
];

export const videoPackages: SponsorPackage[] = [
  {
    id: "aftermovie",
    name: "Aftermovie Feature",
    description: "Be part of our official aftermovie",
    price: 1500,
    availability: "1 available",
    highlighted: true,
    category: "video",
    icon: <Video className="w-5 h-5" />,
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
    price: 1000,
    availability: "3 available",
    category: "video",
    icon: <Video className="w-5 h-5" />,
    features: [
      { label: "Custom short video highlighting your company" },
      { label: "Shared on our social media" },
      { label: "Professional production" },
    ],
  },
];

export const scholarshipPackage: SponsorPackage = {
  id: "scholarship",
  name: "Award a Scholarship",
  description: "Support the next generation of scientists",
  price: "Custom",
  category: "scholarship",
  icon: <Gift className="w-5 h-5" />,
  features: [
    { label: "Support young entrepreneurs, students, or PhD students" },
    { label: "Receive CVs, applications, and contact details" },
    { label: "Ability to choose scholarship recipients" },
    { label: "Recipients get free ticket + €150 travel credit" },
  ],
};

// Components
interface PackageCardProps {
  pkg: SponsorPackage;
  compact?: boolean;
}

function PackageCard({ pkg, compact = false }: PackageCardProps) {
  return (
    <Card
      className={cn(
        "relative border border-muted rounded-xl transition-all hover:shadow-lg hover:border-primary/30 h-full flex flex-col",
        pkg.highlighted && "border-primary ring-1 ring-primary/30"
      )}
    >
      {pkg.highlighted && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
          Popular
        </div>
      )}

      <CardHeader className={cn("text-center", compact ? "pt-6 pb-2" : "pt-8")}>
        {pkg.icon && (
          <div className="flex justify-center mb-3 text-primary">{pkg.icon}</div>
        )}
        <CardTitle className={cn(compact ? "text-lg" : "text-xl")}>{pkg.name}</CardTitle>
        <CardDescription className="text-sm">{pkg.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="text-center mb-4">
          <div className={cn("font-bold mb-1", compact ? "text-2xl" : "text-3xl")}>
            {typeof pkg.price === "number" ? `€${pkg.price.toLocaleString()}` : pkg.price}
          </div>
          {pkg.priceNote && (
            <p className="text-xs text-muted-foreground">{pkg.priceNote}</p>
          )}
          {pkg.availability && (
            <Badge variant="outline" className="mt-2 text-xs">
              {pkg.availability}
            </Badge>
          )}
        </div>

        {pkg.discount && (
          <div className="bg-primary/10 text-primary text-xs px-3 py-2 rounded-lg mb-4 text-center font-medium">
            {pkg.discount}
          </div>
        )}

        <ul className={cn("space-y-2 flex-1", compact ? "text-xs" : "text-sm")}>
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{feature.label}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={pkg.highlighted ? "default" : "outline"}
          className="w-full mt-6"
          asChild
        >
          <a href="mailto:sbr@ga-sb.de?subject=Sponsorship Inquiry: {pkg.name}">
            Inquire Now
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

interface PackageSectionProps {
  title: string;
  subtitle?: string;
  packages: SponsorPackage[];
  columns?: 2 | 3 | 4;
  compact?: boolean;
}

function PackageSection({ title, subtitle, packages, columns = 3, compact = false }: PackageSectionProps) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      <div className={cn("grid grid-cols-1 gap-6", gridCols[columns])}>
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} compact={compact} />
        ))}
      </div>
    </div>
  );
}

export interface SponsoringPackagesProps {
  className?: string;
}

export function SponsoringPackages({ className }: SponsoringPackagesProps) {
  return (
    <section
      className={cn(
        "w-full bg-background text-foreground py-20 px-4 md:px-8",
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">SynBioReactor 2026</Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Sponsorship <span className="text-primary">Packages</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Partner with us to connect with the synthetic biology community and support the next generation of innovators.
          </p>
        </div>

        {/* Basic Package - Featured */}
        <div className="mb-20">
          <div className="max-w-xl mx-auto">
            <PackageCard pkg={sponsorshipPackages[0]} />
          </div>
        </div>

        {/* On-Site Visibility */}
        <PackageSection
          title="On-Site Visibility"
          subtitle="Make your brand stand out at the event"
          packages={visibilityPackages}
          columns={3}
          compact
        />

        {/* Program Participation */}
        <PackageSection
          title="Own the Spotlight"
          subtitle="Lead sessions and engage directly with attendees"
          packages={programPackages}
          columns={3}
          compact
        />

        {/* Digital Visibility */}
        <PackageSection
          title="Digital Visibility"
          subtitle="Reach our community online"
          packages={digitalPackages}
          columns={2}
          compact
        />

        {/* Video Exposure */}
        <PackageSection
          title="Be Remembered"
          subtitle="Video exposure that lasts beyond the event"
          packages={videoPackages}
          columns={2}
          compact
        />

        {/* Scholarship */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Award a Scholarship</h3>
            <p className="text-muted-foreground">Invest in the future of synthetic biology</p>
          </div>
          <div className="max-w-md mx-auto">
            <PackageCard pkg={scholarshipPackage} />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-muted/50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-4">Custom Sponsorship Packages</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Looking for something specific? We offer custom sponsorship packages tailored to your organization's needs and goals.
          </p>
          <Button size="lg" asChild>
            <a href="mailto:sbr@ga-sb.de?subject=Custom Sponsorship Inquiry">
              Contact Us
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            All prices exclude applicable taxes
          </p>
        </div>
      </div>
    </section>
  );
}

export default SponsoringPackages;
