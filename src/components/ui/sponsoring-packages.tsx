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
import { Input } from "@/components/ui/input";
import {
  Check,
  Eye,
  Video,
  Megaphone,
  MapPin,
  Ticket,
  Gift,
  Mic,
  Star,
  Mail,
  Linkedin,
  Lock,
  KeyRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SBROrangeWaveBG from "@/assets/ExportWP/bgImages/SBR_OrangeWave_BG.png";
import {
  sponsoringCatalog,
  categoryLabels,
  categorySubtitles,
  getCatalogPackage,
  resolveOfferLayout,
  type CatalogPackage,
  type OfferSectionLayout,
  type SponsorOffer,
  type SponsorOfferItem,
} from "@/data/sponsoring-catalog";

export interface PackageFeature {
  label: string;
}

export interface SponsorPackage extends Omit<CatalogPackage, "defaultPrice"> {
  price: number | string;
  icon?: React.ReactNode;
}

const packageIcons: Record<string, React.ReactNode> = {
  basic: <Star className="w-6 h-6" />,
  "booth-regular-small": <MapPin className="w-5 h-5" />,
  "booth-regular-large": <MapPin className="w-5 h-5" />,
  "booth-startup": <MapPin className="w-5 h-5" />,
  "event-banner": <Eye className="w-5 h-5" />,
  "branded-lanyard": <Ticket className="w-5 h-5" />,
  "branded-session": <Mic className="w-5 h-5" />,
  "branded-session-addon": <Mic className="w-5 h-5" />,
  "main-stage-talk": <Megaphone className="w-5 h-5" />,
  "newsletter-promo": <Mail className="w-5 h-5" />,
  "linkedin-marketing": <Linkedin className="w-5 h-5" />,
  aftermovie: <Video className="w-5 h-5" />,
  "personal-reel": <Video className="w-5 h-5" />,
  scholarship: <Gift className="w-5 h-5" />,
};

function catalogToPackage(
  catalogItem: CatalogPackage,
  priceOverride?: number | "custom",
): SponsorPackage {
  const { defaultPrice, ...rest } = catalogItem;
  return {
    ...rest,
    price: priceOverride ?? defaultPrice,
    icon: packageIcons[catalogItem.id],
  };
}

function buildPackagesFromOffer(offer: SponsorOffer): SponsorPackage[] {
  return offer.items
    .map((item) => {
      const catalogItem = getCatalogPackage(item.packageId);
      if (!catalogItem) return null;
      return catalogToPackage(catalogItem, item.price);
    })
    .filter((pkg): pkg is SponsorPackage => pkg !== null);
}

function packagesFromSection(
  section: OfferSectionLayout,
  packagesById: Map<string, SponsorPackage>,
): SponsorPackage[] {
  return section.packageIds
    .map((id) => packagesById.get(id))
    .filter((pkg): pkg is SponsorPackage => pkg !== undefined);
}

function centeredGridClass(count: number, columns: 2 | 3 | 4) {
  if (count === 1) return "max-w-sm";
  if (count === 2) return "max-w-sm sm:max-w-[calc(50%-0.75rem)]";
  if (columns === 2) return "max-w-sm sm:max-w-[calc(50%-0.75rem)]";
  if (columns === 4) return "max-w-sm sm:max-w-[calc(50%-0.75rem)] lg:max-w-[calc(25%-0.75rem)]";
  return "max-w-sm sm:max-w-[calc(50%-0.75rem)] lg:max-w-[calc(33.333%-0.75rem)]";
}

interface PackageCardProps {
  pkg: SponsorPackage;
  compact?: boolean;
  companyName?: string;
}

function PackageCard({ pkg, compact = false, companyName }: PackageCardProps) {
  const subject = companyName
    ? `Sponsorship Inquiry (${companyName}): ${pkg.name}`
    : `Sponsorship Inquiry: ${pkg.name}`;

  return (
    <Card
      className={cn(
        "relative border border-muted rounded-xl transition-all hover:shadow-lg hover:border-primary/30 h-full flex flex-col",
        pkg.highlighted && "border-primary ring-1 ring-primary/30",
      )}
    >
      {pkg.highlighted && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
          Included
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
          <a href={`mailto:sbr@ga-sb.de?subject=${encodeURIComponent(subject)}`}>
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
  companyName?: string;
}

function PackageSection({
  title,
  subtitle,
  packages,
  columns = 3,
  compact = false,
  companyName,
  showHeader = true,
}: PackageSectionProps & { showHeader?: boolean }) {
  if (packages.length === 0) return null;

  const count = packages.length;

  return (
    <div className="mb-14">
      {showHeader && (
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className={cn("w-full", centeredGridClass(count, columns))}>
            <PackageCard
              pkg={pkg}
              compact={compact}
              companyName={companyName}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function TailoredPackagesView({
  offer,
  className,
  onSignOut,
}: {
  offer: SponsorOffer;
  className?: string;
  onSignOut?: () => void;
}) {
  const packages = buildPackagesFromOffer(offer);
  const packagesById = new Map(packages.map((pkg) => [pkg.id, pkg]));
  const layout = resolveOfferLayout(offer);

  const activeSections = layout.sections.filter(
    (section) => section.enabled && section.packageIds.length > 0,
  );

  const total =
    offer.items.reduce((sum, item) => {
      if (typeof item.price === "number") return sum + item.price;
      return sum;
    }, 0) ?? 0;

  const showSectionHeader = (sectionPackages: SponsorPackage[]) =>
    activeSections.length > 1 || sectionPackages.length > 1;

  return (
    <section
      className={cn(
        "w-full bg-background text-foreground py-12 md:py-16 px-4 md:px-8",
        className,
      )}
    >
      <div className="max-w-6xl mx-auto">
        <div className="relative text-center mb-12 md:mb-14">
          {onSignOut && (
            <div className="flex justify-end mb-4 md:absolute md:right-0 md:top-0 md:mb-0">
              <Button variant="ghost" size="sm" onClick={onSignOut}>
                Use a different code
              </Button>
            </div>
          )}
          <Badge className="mb-4">Prepared for {offer.companyName}</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {offer.title || (
              <>
                Your <span className="text-primary">Sponsorship Offer</span>
              </>
            )}
          </h2>
          {offer.message ? (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {offer.message}
            </p>
          ) : (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              This package was tailored specifically for {offer.companyName}.
            </p>
          )}
          {total > 0 && (
            <p className="mt-5 text-base md:text-lg">
              Total package value:{" "}
              <span className="font-bold text-primary">€{total.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground"> (excl. taxes)</span>
            </p>
          )}
        </div>

        <div className="space-y-14 md:space-y-16">
          {activeSections.map((section) => {
            const sectionPackages = packagesFromSection(section, packagesById);
            if (sectionPackages.length === 0) return null;

            const columns =
              section.id === "digital" || section.id === "video"
                ? 2
                : section.id === "main" || section.id === "scholarship"
                  ? 1
                  : 3;

            const compact = section.id !== "main";
            const showHeader = showSectionHeader(sectionPackages);

            return (
              <PackageSection
                key={section.id}
                title={categoryLabels[section.id]}
                subtitle={categorySubtitles[section.id]}
                packages={sectionPackages}
                columns={columns as 2 | 3}
                compact={compact}
                companyName={offer.companyName}
                showHeader={showHeader}
              />
            );
          })}
        </div>

        <div className="text-center bg-muted/50 rounded-2xl p-8 md:p-12 mt-14">
          <h3 className="text-2xl font-bold mb-4">Ready to move forward?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Contact us to confirm your sponsorship package or discuss any adjustments.
          </p>
          <Button size="lg" asChild>
            <a
              href={`mailto:sbr@ga-sb.de?subject=${encodeURIComponent(`Sponsorship Offer – ${offer.companyName}`)}`}
            >
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

export interface SponsoringPackagesProps {
  className?: string;
  /** When true, code entry is handled elsewhere (e.g. page hero). Only renders the offer when unlocked. */
  hideGate?: boolean;
}

const CODE_STORAGE_KEY = "sbr_sponsor_access_code";
const OFFER_STORAGE_KEY = "sbr_sponsor_offer";
const CODE_SYNC_EVENT = "sbr:sponsor-code";

function resolveSponsorApiUrl(): string {
  if (import.meta.env.PUBLIC_SPONSOR_API_URL) {
    return import.meta.env.PUBLIC_SPONSOR_API_URL;
  }
  if (import.meta.env.PUBLIC_SPONSOR_EMAIL_API_URL) {
    return import.meta.env.PUBLIC_SPONSOR_EMAIL_API_URL;
  }
  if (import.meta.env.DEV && typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:3001`;
  }
  return "http://localhost:3001";
}

export function SponsoringPackages({ className, hideGate = false }: SponsoringPackagesProps) {
  const [code, setCode] = React.useState("");
  const [offer, setOffer] = React.useState<SponsorOffer | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [codeError, setCodeError] = React.useState("");

  const persistOffer = React.useCallback((accessCode: string, nextOffer: SponsorOffer) => {
    try {
      localStorage.setItem(CODE_STORAGE_KEY, accessCode);
      localStorage.setItem(OFFER_STORAGE_KEY, JSON.stringify(nextOffer));
    } catch {
      // Ignore storage access issues
    }
    setOffer(nextOffer);
    setCode(accessCode);
  }, []);

  const verifyCode = React.useCallback(
    async (rawCode: string) => {
      const trimmed = rawCode.trim();
      if (!trimmed) {
        setCodeError("Please enter your access code");
        return;
      }

      setIsSubmitting(true);
      setCodeError("");

      try {
        const apiUrl = resolveSponsorApiUrl();
        const response = await fetch(`${apiUrl}/api/verify-sponsor-code`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: trimmed }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Invalid access code");
        }

        persistOffer(trimmed, data.offer as SponsorOffer);
        window.dispatchEvent(
          new CustomEvent(CODE_SYNC_EVENT, {
            detail: { code: trimmed, offer: data.offer },
          }),
        );
      } catch (error) {
        setCodeError(
          error instanceof TypeError
            ? "Could not reach the sponsor API. Check that the API server is running on port 3001."
            : error instanceof Error
              ? error.message
              : "Could not verify access code",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [persistOffer],
  );

  React.useEffect(() => {
    try {
      const storedOffer = localStorage.getItem(OFFER_STORAGE_KEY);
      const storedCode = localStorage.getItem(CODE_STORAGE_KEY);
      if (storedOffer && storedCode) {
        setOffer(JSON.parse(storedOffer) as SponsorOffer);
        setCode(storedCode);
      }
    } catch {
      // Ignore storage access issues
    }
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    const onSync = (e: Event) => {
      const detail = (e as CustomEvent)?.detail as
        | { code?: string; offer?: SponsorOffer }
        | undefined;
      if (!detail?.offer || !detail.code) return;
      persistOffer(detail.code, detail.offer);
    };

    window.addEventListener(CODE_SYNC_EVENT, onSync);
    return () => window.removeEventListener(CODE_SYNC_EVENT, onSync);
  }, [persistOffer]);

  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === OFFER_STORAGE_KEY && e.newValue) {
        setOffer(JSON.parse(e.newValue) as SponsorOffer);
      }
      if (e.key === CODE_STORAGE_KEY && e.newValue) {
        setCode(e.newValue);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void verifyCode(code);
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem(CODE_STORAGE_KEY);
      localStorage.removeItem(OFFER_STORAGE_KEY);
    } catch {
      // Ignore storage access issues
    }
    setOffer(null);
    setCode("");
    setCodeError("");
    window.dispatchEvent(new CustomEvent("sbr:sponsor-signout"));
  };

  if (isLoading) {
    return (
      <section
        className={cn(
          "w-full bg-background text-foreground py-20 px-4 md:px-8",
          className,
        )}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </section>
    );
  }

  if (offer) {
    return (
      <TailoredPackagesView
        offer={offer}
        className={className}
        onSignOut={handleSignOut}
      />
    );
  }

  if (hideGate) {
    return null;
  }

  return (
    <section
      className={cn(
        "w-full text-foreground py-20 px-4 md:px-8 relative",
        className,
      )}
    >
      <div className="inset-0 absolute z-0 translate-y-[150px] lg:translate-y-[200px] rounded-2xl overflow-hidden">
        <img
          src={SBROrangeWaveBG.src}
          alt=""
          className="w-full h-full min-w-[800px] object-cover object-top z-0"
        />
      </div>
      <div className="max-w-2xl mx-auto z-10 relative">
        <Card className="border-primary/30">
          <CardHeader className="text-center pt-8">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">Access Your Sponsorship Offer</CardTitle>
            <CardDescription className="text-base">
              Enter the access code we shared with you to view your tailored
              sponsorship package for SynBioReactor 2026
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="access-code" className="block text-sm font-medium mb-2">
                  Access Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="access-code"
                    type="text"
                    placeholder="Enter your access code"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setCodeError("");
                    }}
                    className={cn("pl-10", codeError && "border-destructive")}
                    required
                    disabled={isSubmitting}
                    autoComplete="off"
                  />
                </div>
                {codeError && (
                  <p className="text-sm text-destructive mt-2">{codeError}</p>
                )}
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Verifying..." : "View My Offer"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Don&apos;t have a code yet? Contact us at{" "}
                <a href="mailto:sbr@ga-sb.de" className="text-primary hover:underline">
                  sbr@ga-sb.de
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// Re-export catalog helpers for backwards compatibility
export const sponsorshipPackages = sponsoringCatalog
  .filter((pkg) => pkg.category === "main")
  .map((pkg) => catalogToPackage(pkg));

export const visibilityPackages = sponsoringCatalog
  .filter((pkg) => pkg.category === "visibility")
  .map((pkg) => catalogToPackage(pkg));

export const programPackages = sponsoringCatalog
  .filter((pkg) => pkg.category === "program")
  .map((pkg) => catalogToPackage(pkg));

export const digitalPackages = sponsoringCatalog
  .filter((pkg) => pkg.category === "digital")
  .map((pkg) => catalogToPackage(pkg));

export const videoPackages = sponsoringCatalog
  .filter((pkg) => pkg.category === "video")
  .map((pkg) => catalogToPackage(pkg));

export const scholarshipPackage = catalogToPackage(
  sponsoringCatalog.find((pkg) => pkg.id === "scholarship")!,
);

export default SponsoringPackages;
