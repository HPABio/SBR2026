import * as React from "react"
import { CircleCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type BillingPeriod = "monthly" | "annually"

export interface PricingFiveProps {
  title?: string
  subtitle?: string
  planName?: string
  planDescription?: string
  monthlyPrice: number
  annuallyPrice: number
  savingPercent?: number
  currency?: string
  billingPeriodLabel?: string
  ctaLabel?: string
  ctaHref?: string
  features: string[]
  disclaimer?: string
  defaultPeriod?: BillingPeriod
  className?: string
}

export function PricingFive({
  title = "One simple plan, One Price",
  subtitle = "Everything you need to optimize your workflow in one affordable package",
  planName = "All-in-One Solution",
  planDescription = "Everything you need in one simple plan",
  monthlyPrice,
  annuallyPrice,
  savingPercent = 25,
  currency = "$",
  billingPeriodLabel = "Billed annually",
  ctaLabel = "Get Started Now",
  ctaHref = "#",
  features,
  disclaimer = "No hidden fees. Cancel anytime. Invoices available for easy reimbursement",
  defaultPeriod = "annually",
  className,
}: PricingFiveProps) {
  const [period, setPeriod] = React.useState<BillingPeriod>(defaultPeriod)
  const isAnnually = period === "annually"
  const price = isAnnually ? annuallyPrice : monthlyPrice

  return (
    <section
      className={cn(
        "bg-background @container relative py-16 text-foreground md:py-32",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <h2 className="text-balance text-3xl font-semibold md:text-4xl lg:text-5xl lg:tracking-tight">
            {title}
          </h2>
          <p className="mt-8 text-balance text-lg text-muted-foreground lg:text-xl">
            {subtitle}
          </p>

          <div className="my-8">
            <div
              className="relative mx-auto grid w-fit grid-cols-2 rounded-full bg-foreground/5 p-1 text-sm text-foreground/75"
              role="tablist"
              aria-label="Billing period"
            >
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-1 w-1/2 rounded-full border border-transparent bg-card shadow ring-1 ring-foreground/5 transition-transform duration-500 ease-in-out",
                  isAnnually ? "translate-x-full" : "translate-x-0",
                )}
              />
              <button
                type="button"
                role="tab"
                aria-selected={!isAnnually}
                className={cn(
                  "relative h-8 w-24 rounded-full transition-opacity hover:opacity-75",
                  !isAnnually && "font-medium text-foreground",
                )}
                onClick={() => setPeriod("monthly")}
              >
                Monthly
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={isAnnually}
                className={cn(
                  "relative h-8 w-24 rounded-full transition-opacity hover:opacity-75",
                  isAnnually && "font-medium text-foreground",
                )}
                onClick={() => setPeriod("annually")}
              >
                Annually
              </button>
            </div>
            {savingPercent > 0 && (
              <div className="mt-3 flex items-center justify-center gap-1 text-xs">
                <Badge
                  variant="secondary"
                  className="border-transparent bg-transparent px-0 text-primary"
                >
                  Save {savingPercent}%
                </Badge>
                <span>On Annual Billing</span>
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto flex max-w-md flex-col gap-8">
          <Card className="gap-6 rounded-2xl bg-card p-8 text-center shadow-xl shadow-black/6 ring-1 ring-border @lg:p-10">
            <CardContent className="flex flex-col items-center gap-6 px-0">
              <div>
                <CardTitle className="text-lg font-medium">
                  {planName}
                </CardTitle>
                <CardDescription className="mx-auto mt-1 max-w-xs text-balance">
                  {planDescription}
                </CardDescription>
              </div>

              <div className="mx-auto grid w-fit grid-cols-[auto_1fr] items-center gap-3">
                <span className="text-5xl font-semibold tracking-tight tabular-nums transition-all duration-500">
                  {currency}
                  {price}
                </span>
                <div className="text-left">
                  <span className="text-sm">Per month</span>
                  <div className="w-22 text-xs text-muted-foreground">
                    {isAnnually ? billingPeriodLabel : "Billed monthly"}
                  </div>
                </div>
              </div>

              <Button asChild className="shadow-md shadow-black/15">
                <a href={ctaHref}>{ctaLabel}</a>
              </Button>

              <div
                aria-hidden="true"
                className="mx-16 h-px self-stretch bg-[linear-gradient(90deg,currentColor_1px,transparent_1px)] bg-size-[6px_1px] bg-repeat-x text-foreground opacity-25"
              />

              <CardDescription className="mx-auto max-w-xs text-balance">
                {disclaimer}
              </CardDescription>
            </CardContent>
          </Card>

          <ul
            role="list"
            className="grid gap-4 text-sm @md:grid-cols-2"
          >
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <CircleCheck
                  aria-hidden="true"
                  className="size-5 fill-emerald-500/10 stroke-emerald-500/10 [&>path]:stroke-emerald-600 [&>path]:drop-shadow dark:[&>path]:stroke-emerald-400"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
