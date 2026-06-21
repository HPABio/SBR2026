import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PricingFive } from "@/components/ui/pricing-five"
import { PricingModule, type PricingPlan } from "@/components/ui/pricing-module"
import BorderGlow from "@/components/BorderGlow"
import { Lab1AppearanceModal } from "@/components/ui/lab1-appearance-modal"
import { Lab1ActionMenu } from "@/components/ui/lab1-action-menu"
import { Lab1ContextMenu } from "@/components/ui/lab1-context-menu"
import { Lab1Timeline } from "@/components/ui/lab1-timeline"
import { Lab1Clock } from "@/components/ui/lab1-clock"
import { LuminousCard } from "@/components/ui/luminous-card"
import { GradientBars } from "@/components/ui/gradient-bars"
import GridList02 from "@/components/ui/grid-list-02"
import { Sparkles, Users, Zap } from "lucide-react"

import "@/components/ui/lab1-system.css"

const pricingModulePlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For small teams getting started",
    icon: <Sparkles className="size-5" />,
    priceMonthly: 19,
    priceYearly: 190,
    users: "Up to 3 users",
    features: [
      { label: "Basic analytics", included: true },
      { label: "Email support", included: true },
      { label: "Custom domains", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "For growing teams",
    icon: <Users className="size-5" />,
    priceMonthly: 49,
    priceYearly: 490,
    users: "Up to 10 users",
    recommended: true,
    features: [
      { label: "Advanced analytics", included: true },
      { label: "Priority support", included: true },
      { label: "Custom domains", included: true },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    description: "For larger organizations",
    icon: <Zap className="size-5" />,
    priceMonthly: 99,
    priceYearly: 990,
    users: "Up to 25 users",
    features: [
      { label: "Dedicated manager", included: true },
      { label: "SSO", included: true },
      { label: "Audit logs", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions at scale",
    icon: <Zap className="size-5" />,
    priceMonthly: 199,
    priceYearly: 1990,
    users: "Unlimited users",
    features: [
      { label: "Custom SLA", included: true },
      { label: "On-prem option", included: true },
      { label: "White labeling", included: true },
    ],
  },
]

export function PricingFiveDemo() {
  return (
    <PricingFive
      className="py-8 md:py-12"
      monthlyPrice={349}
      annuallyPrice={262}
      features={[
        "Team Collaboration",
        "Custom Templates",
        "24/7 Customer Support",
        "API Access",
      ]}
    />
  )
}

export function PricingModuleDemo() {
  return (
    <PricingModule
      className="py-8 md:py-12"
      title="Pricing Plans"
      subtitle="Preview of the multi-plan pricing module."
      plans={pricingModulePlans}
    />
  )
}

export function BorderGlowDemo() {
  return (
    <div className="flex justify-center p-6">
      <BorderGlow className="w-full max-w-3xl min-h-64" borderRadius={28}>
        <div className="flex min-h-64 flex-col justify-center gap-2 p-8">
          <span className="text-xl font-semibold text-white">Hover the edges</span>
          <p className="max-w-lg text-sm text-white/60">
            Cursor-reactive mesh border with animated sweep.
          </p>
        </div>
      </BorderGlow>
    </div>
  )
}

export function Lab1AppearanceModalDemo() {
  return (
    <div className="lab1-scene lab1-scene--embed">
      <Lab1AppearanceModal />
    </div>
  )
}

export function Lab1ActionMenuDemo() {
  return (
    <div className="lab1-scene lab1-scene--embed">
      <Lab1ActionMenu />
    </div>
  )
}

export function Lab1ContextMenuDemo() {
  return (
    <div className="lab1-scene lab1-scene--embed">
      <Lab1ContextMenu />
    </div>
  )
}

export function Lab1TimelineDemo() {
  return (
    <div className="lab1-scene lab1-scene--embed">
      <Lab1Timeline />
    </div>
  )
}

export function Lab1ClockDemo() {
  return (
    <div className="lab1-scene lab1-scene--embed">
      <Lab1Clock />
    </div>
  )
}

export function LuminousCardDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <LuminousCard />
    </div>
  )
}

export function GradientBarsDemo() {
  return (
    <div className="h-56 w-full overflow-hidden">
      <GradientBars />
    </div>
  )
}

export function GridList02Demo() {
  return (
    <div className="p-2">
      <GridList02 />
    </div>
  )
}

export function ShadcnPrimitivesDemo() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Shadcn primitives</CardTitle>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <CardDescription>Button, badge, and card composition.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
      </CardContent>
    </Card>
  )
}
