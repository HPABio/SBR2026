import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Handshake, Users2, Link2 } from "lucide-react"

export default function PartnersAndSupportersSections() {
  const goldSponsors = [
    { name: "SPRIN-D", logo: "src/assets/partners-logos/LinkedIn-Thumbnails/SPRIND_-_Bundesagentur_für_Sprunginnovationen-sprind.jpeg" },
    { name: "BIOCENTRA", logo: "src/assets/partners-logos/LinkedIn-Thumbnails/BioCentra-biocentra-eu.jpeg" },
    { name: "VOSSIUS", logo: "src/assets/partners-logos/LinkedIn-Thumbnails/VOSSIUS-vossiusandpartner.jpeg" },
  ]

  const silverSponsors = [
    { name: "BioCircular", logo: "src/assets/partners-logos/biocircular-logo.jpg" },
    { name: "GreenChem Solutions", logo: "src/assets/partners-logos/greenchem-solutions-logo.jpg" },
    { name: "MetaboliteTech", logo: "src/assets/partners-logos/metabolitetech-logo.jpg" },
    { name: "BioScale Partners", logo: "src/assets/partners-logos/bioscale-partners-logo.jpg" },
    { name: "Enzyme Dynamics", logo: "src/assets/partners-logos/enzyme-dynamics-logo.jpg" },
  ]

  const partners = [
    { name: "GASB", description: "German Association for Synthetic Biology", icon: Building2 },
    { name: "Max Planck Institute", description: "Research Excellence in Biotechnology", icon: Building2 },
    { name: "Technical University Berlin", description: "Academic Partner", icon: Building2 },
    { name: "BioRegion Berlin", description: "Regional Innovation Network", icon: Building2 },
  ]

  const collaborators = [
    { name: "European SynBio Alliance", description: "Pan-European Network" },
    { name: "BioInnovate Hub", description: "Innovation Accelerator" },
    { name: "Life Sciences Network", description: "Industry Connection" },
    { name: "Green Chemistry Institute", description: "Sustainability Partner" },
    { name: "Biotech Founders Club", description: "Startup Community" },
    { name: "Lab-to-Market Initiative", description: "Commercialization Support" },
  ]

  const connectors = [
    { name: "Dr. Sarah Weber", role: "Biotech Investment Expert" },
    { name: "Prof. Michael Schmidt", role: "Synthetic Biology Pioneer" },
    { name: "Anna Hoffmann", role: "Industry Relations" },
    { name: "Dr. Thomas Klein", role: "Research Translation" },
    { name: "Lisa Müller", role: "Startup Ecosystem Builder" },
    { name: "Dr. Andreas Berg", role: "Innovation Advisor" },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <Badge variant="outline" className="border-primary text-primary font-mono uppercase tracking-wider">
                Partner Program
              </Badge>
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center">
                <h2 className="w-fit text-3xl font-anton font-black md:text-6xl lg:text-7xl tracking-tight uppercase text-left">Meet Our Network of <br/>
                    <span className="text-8xl text-primary">Supporters</span>
                    <p className="ml-2 font-quicksand text-muted-foreground max-w-3xl font-light text-sm md:text-md text-left tracking-widest">
                      partners, sponsors, and contributors
                    </p>
                    </h2>
            </div>

          </div>
        </div>
      </section>

      {/* Gold Sponsors */}
      <section className="py-20 px-4 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Gold Tier</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Premium Sponsors</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platinum partners driving innovation in synthetic biology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 justify-items-center items-center mx-auto">
            {goldSponsors.map((sponsor, index) => (
              <Card
                key={index}
                className="bg-card border-2 border-primary/30 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 aspect-square
                overflow-hidden max-w-[250px]" >
                <CardContent className="w-full h-full ">
                  <div className="flex items-center justify-center h-full w-full">
                    <img
                      src={sponsor.logo || "src/assets/partners-logos/placeholder.svg"}
                      alt={sponsor.name}
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Silver Sponsors */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Silver Tier</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Supporting Sponsors</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Organizations championing synthetic biology advancement
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {silverSponsors.map((sponsor, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 transition-all hover:shadow-md"
              >
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center justify-center h-24">
                    <img
                      src={sponsor.logo || "src/assets/partners-logos/placeholder.svg"}
                      alt={sponsor.name}
                      className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 px-4 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Handshake className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Partners</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Strategic <span className="text-primary">Partners</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leading institutions shaping the synthetic biology landscape
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {partners.map((partner, index) => {
              const Icon = partner.icon
              return (
                <Card
                  key={index}
                  className="bg-card border-border hover:border-primary/50 transition-all hover:shadow-md group"
                >
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">{partner.name}</h3>
                        <p className="text-muted-foreground">{partner.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Collaborators */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
              <Users2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Collaborators</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Community <span className="text-primary">Collaborators</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Network partners amplifying our collective impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collaborators.map((collaborator, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardContent className="pt-4 pb-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{collaborator.name}</h3>
                    <p className="text-sm text-muted-foreground">{collaborator.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Connectors */}
      <section className="py-20 px-4 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Link2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Connectors</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Key <span className="text-primary">Connectors</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Individuals bridging startups, investors, and industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectors.map((connector, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all group">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex-shrink-0 group-hover:bg-primary/30 transition-colors" />
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg">{connector.name}</h3>
                      <p className="text-sm text-muted-foreground">{connector.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/30">
            <CardContent className="pt-12 pb-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl text-balance uppercase">
                <span className="text-primary font-bold ">Help Us</span> spread the word!
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-4xl mx-auto">
                Share the event online with your networks - either via social media channels or via for your accessable email lists.
                Send us a message to let us know about your effort and get listed here as a connector or collaborator.
                If you are interested in becoming a partner or sponsor, please contact us - we still have some vacancies left for organizations and individuals.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href="mailto:sbr@ga-sb.de"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg rounded-lg transition-colors"
                >
                  Become a Partner
                </a>
                <a
                  href="/sponsoring"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-border hover:bg-card font-semibold text-lg rounded-lg transition-colors bg-transparent"
                >
                  Sponsorship Info
                </a>
              </div>
            </CardContent>
          </Card>
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
    </>
  )
}

