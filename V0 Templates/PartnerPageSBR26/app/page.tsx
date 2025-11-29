import { Navigation } from "@/components/navigation"
import { PitchForm } from "@/components/pitch-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Users, TrendingUp, Award, Microscope, Rocket } from "lucide-react"

export default function PitchingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <span className="text-sm font-mono text-primary uppercase tracking-wider">StartUp x Investor Summit</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
              <span className="text-primary">PITCH</span> YOUR
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
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Berlin, Germany</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Jan 19-20, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 lg:px-8 bg-card/50">
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

      {/* Benefits Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Why Pitch at <span className="text-primary">SynBio Reactor?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Join Europe's fasgrowing synthetic biology startup ecosystem
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

      {/* Judges Section */}
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
            {[
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
            ].map((judge, index) => (
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

      {/* Application Form Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Ready to <span className="text-primary">Take the Stage?</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance">
              Applications close December 15, 2025. Limited spots available.
            </p>
          </div>

          <PitchForm />
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
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
    </div>
  )
}
