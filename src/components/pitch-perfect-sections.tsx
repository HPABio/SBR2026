import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Users, TrendingUp, Award, Microscope, Rocket, MapPin, Calendar } from "lucide-react"
import video from "/Assets/pitching_session/PitchingVideo_Example_SBR2026.mp4"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 lg:px-8 relative">
      {/* Absolute inset image for background */}
      {/* 
        We use a wrapper div with animation classes to fade the video in and out.
        This approach uses Tailwind CSS (or your CSS-in-JS approach) for fading,
        or, if Tailwind is not available, you should implement your own fading CSS animation.
      */}
      <div className="fade-video-wrapper absolute w-full h-full -z-10">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover no-repeat scale-[1.75] fade-in"
          aria-hidden="true"
          draggable="false"
        />
      </div>
      {/* 
        CSS (add in your global CSS for fade effect):

        .fade-in {
          opacity: 0;
          animation: fadeInVideo 2s ease-in forwards;
        }
        @keyframes fadeInVideo {
          to { opacity: 1; }
        }
        // For fade out, apply a class with animation reversing opacity to 0.
      */}
      {/* <img
        src="/Assets/Home - SynBioReactor Summit 2026_files/Betonhalle-Welcome-SBR2026-AI-Nano-Banana.jpeg"
        alt=""
        className="absolute w-full h-full object-cover no-repeat -z-10 scale-[1.75]"
        aria-hidden="true"
        draggable="false"
      /> */}
      {/* Gradient overlay from bottom (black) to top (transparent) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black pointer-events-none" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-6">
          <div className="inline-block">
            <span className="text-sm font-mono text-primary uppercase tracking-wider">StartUp x Investor Summit</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
            <span
              className="font-black bg-gradient-to-tl from-[#dd5404] to-[#ff8800] bg-clip-text text-transparent inline-block"
            >
              PITCH
            </span>{" "}
            YOUR
            <br />
            <span className="text-foreground">SYNBIO STARTUP</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Present your groundbreaking synthetic biology innovation to leading investors and industry experts at
            Berlin's premier biotech summit
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8"
            >
              Apply Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-border hover:bg-card font-semibold text-lg px-8 bg-transparent"
            >
              View Schedule
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Berlin, Germany</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Jan 19-20, 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function StatsSection() {
  return (
    <section className="py-16 px-4 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-primary">5min</div>
            <div className="text-lg text-foreground font-medium">Pitch Duration</div>
            <div className="text-sm text-muted-foreground">Followed by Q&A</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-primary">15+</div>
            <div className="text-lg text-foreground font-medium">Expert Judges</div>
            <div className="text-sm text-muted-foreground">VCs & Industry Leaders</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-primary">500+</div>
            <div className="text-lg text-foreground font-medium">Attendees</div>
            <div className="text-sm text-muted-foreground">Investors & Founders</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function BenefitsSection() {
  return (
    <section className="py-20 px-4 lg:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Why Pitch at <span className="text-primary">SynBio Reactor?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Join Europe's fastest-growing synthetic biology startup ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Direct Investor Access</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with top-tier VCs actively investing in synthetic biology and biotech startups
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Prize & Recognition</h3>
              <p className="text-muted-foreground leading-relaxed">
                Win cash prizes, mentorship packages, and media coverage for your startup
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Microscope className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Expert Feedback</h3>
              <p className="text-muted-foreground leading-relaxed">
                Receive actionable insights from industry veterans and successful biotech founders
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Media Exposure</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get featured in leading biotech publications and industry newsletters
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Partnership Opportunities</h3>
              <p className="text-muted-foreground leading-relaxed">
                Network with potential co-founders, advisors, and strategic partners
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Community Access</h3>
              <p className="text-muted-foreground leading-relaxed">
                Join GASB network and connect with Europe's synthetic biology community
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export function JudgesSection() {
  const judges = [
    {
      name: "Dr. Sarah Chen",
      role: "Partner, BioVentures Capital",
      expertise: "Synthetic Biology Investments",
    },
    {
      name: "Prof. Michael Weber",
      role: "Director, Max Planck Institute",
      expertise: "Metabolic Engineering",
    },
    { name: "Anna Kowalski", role: "CEO, GeneTech Solutions", expertise: "Biotech Scale-up" },
    {
      name: "Dr. James Morrison",
      role: "Managing Director, DeepTech Fund",
      expertise: "Early-stage Biotech",
    },
    { name: "Lisa Andersson", role: "Founder, BioCircular", expertise: "Green Chemistry" },
    { name: "Dr. Raj Patel", role: "VP Innovation, Novozymes", expertise: "Industrial Biotechnology" },
  ]

  return (
    <section className="py-20 px-4 lg:px-8 bg-card/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Meet the <span className="text-primary">Expert Judges</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Your pitch will be evaluated by leading investors and industry pioneers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {judges.map((judge, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="pt-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto" />
                <div className="text-center space-y-1">
                  <h3 className="font-bold text-lg">{judge.name}</h3>
                  <p className="text-sm text-muted-foreground">{judge.role}</p>
                  <p className="text-xs text-primary font-medium">{judge.expertise}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTASection() {
  return (
    <section className="py-20 px-4 lg:px-8 bg-primary/10">
      <div className="container mx-auto max-w-4xl text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-balance">Questions About the Pitching Contest?</h2>
        <p className="text-lg text-muted-foreground text-balance">
          Contact our team for more information about the application process, judging criteria, and event details.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold bg-transparent"
          >
            Contact Us
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-border hover:bg-card font-semibold bg-transparent"
          >
            View FAQ
          </Button>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="py-12 px-4 lg:px-8 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary" />
            </div>
            <span className="font-bold">SynBio Reactor Summit 2026</span>
          </div>
          <div className="text-sm text-muted-foreground">© 2026 GASB - German Association for Synthetic Biology</div>
        </div>
      </div>
    </footer>
  )
}

