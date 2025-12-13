import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users2, Link2, Rocket, Unplug, Linkedin, Twitter, Instagram, Link } from "lucide-react"

import partnersLogoList from "@/data/partnersLogoList.json"

// Logos
import SPRIND from "@/assets/partners-logos/LinkedIn-Thumbnails/SPRIND_-_Bundesagentur_für_Sprunginnovationen-sprind.jpeg"
import BIOCENTRA from "@/assets/partners-logos/LinkedIn-Thumbnails/BioCentra-biocentra-eu.jpeg"
import VOSSIUS from "@/assets/partners-logos/LinkedIn-Thumbnails/VOSSIUS-vossiusandpartner.jpeg"
import BioCircular from "@/assets/partners-logos/dummyLogos/biocircular-logo.jpg"
import GASB_Logo from "@/assets/GASB_Logo_white.png"
import GASB_Logo_Black from "@/assets/GASB_Logo_black-round.png"
import Biocompile from "@/assets/logos/Sponsors/Biocompile_Logo_white.png"
import BrightBiotech from "@/assets/logos/Sponsors/BrightBiotech_Logo.png"
import UniteLabs from "@/assets/logos/Sponsors/UniteLabs_Logo.png"
import CordenBiochem from "@/assets/logos/Sponsors/CordenBiochem_Logo.png"
import Nucleate from "@/assets/logos/Nucleate_Logo.png"
// import FoodLabs from "@/assets/logos/FoodLabs_Logo.png"
// import BiocatalystFoundation from "@/assets/logos/Biocatalyst_Foundation_Logo.png"
// import BCG from "@/assets/logos/Boston_Consulting_Group_(BCG)-boston-consulting-group"
import BCG from "@/assets/partners-logos/LinkedIn-Thumbnails/BCG_Boston_Consulting_Group_white.jpeg"
// import Mimotype from "@/assets/logos/Mimotype_Logo.png"

const logoNA = "https://img.freepik.com/premium-vector/available-allowed-icon-concept_313674-31214.jpg"


//People
import AdrianFriedrich from "@/assets/ExportWP/advisors/Advisor_AF_.png"
import IrisLam from "@/assets/ExportWP/advisors/Advisor_IL_.png"
import KathrinBrenker from "@/assets/ExportWP/advisors/Advisor_KB_.png"
import MaxLebeau from "@/assets/ExportWP/advisors/Advisor_ML_.png"
import HendrikCooper from "@/assets/ExportWP/advisors/SBR-Advisor-HC.png"
import NicolasKrink from "@/assets/ExportWP/advisors/SBR-Advisor-NK.png"
import PatrickRose from "@/assets/ExportWP/advisors/SBR-Advisor-PR.png"


export default function PartnersAndSupportersSections() {
  const mainSponsors = [
    { name: "SPRIN-D", logo: SPRIND, link:"https://www.sprind.org/" },
    { name: "GASB", logo: GASB_Logo_Black, link:"https://www.gasb.de/" },
    { name: "BIOCENTRA", logo: BIOCENTRA, link:"dummy " },
    // { name: "VOSSIUS", logo: VOSSIUS, link:"https://www.vossius.eu/en/" },
  ]
  const supportingSponsors = [
    { name: "Corden Biochem", logo: CordenBiochem, link:"https://www.cordenbiochem.com/" },
    { name: "UniteLabs", logo: UniteLabs, link:"https://www.unitelabs.io/" },
    { name: "Bright Biotech", logo: BrightBiotech, link:"https://www.brightbiotech.co.uk/" },
    { name: "biocompile", logo: Biocompile, link:"https://www.biocompile.com/" },
  ]

  const advisoryBoard = [
    { name: "Patrick Rose",
      image: PatrickRose,
      link:"dummy",
      company:"SPRIN-D",
      logo: SPRIND,
      linkedIn :"",
      twitterX: "",
      instagram: "",
      },
  { name: "Nicolas Krink",
      image: NicolasKrink,
      link:"dummy",
      company:"Biohalo",
      logo: BioCircular,
      linkedIn :"",
      twitterX: "",
      instagram: "",
      },
  { name: "Max Lebeau",
      image: MaxLebeau,
      link:"dummy",
      company:"Amino Collective",
      logo: BioCircular,
      linkedIn :"",
      twitterX: "",
      instagram: "",
      },
  { name: "Kathrin Brenker",
      image: KathrinBrenker,
      link:"dummy",
      company:"OptoBiolabs",
      logo: BioCircular,
      linkedIn :"",
      twitterX: "",
      instagram: "",
      },
  { name: "Adrian Friedrich",
      image: AdrianFriedrich,
      link:"dummy",
      company:"FoodLabs",
      logo: BioCircular,
      linkedIn :"",
      twitterX: "",
      instagram: "",
      },
      { name: "Hendrik Cooper",
      image: HendrikCooper,
      link:"dummy",
      company:"BioCentra",
      logo: BioCircular,
      linkedIn :"",
      twitterX: "",
      instagram: "",
      },
      { name: "Iris Lam",
      image: IrisLam,
      link:"dummy",
      company:"Techbio",
      logo: BioCircular,
      linkedIn :"https://www.linkedin.com/in/iris-lam-053050175/",
      twitterX: "https://x.com/IrisLam_",
      instagram: "https://www.instagram.com/iris.lam/",
      },
  ]
  
  // { name: "Massimo Porticasso", logo: MassimoPorticasso, link:"dummy", imageClasses:""},
  // { name: "Andreas Worberg", logo: AndreasWorberg, link:"dummy", imageClasses:""},
  // { name: "Andreas Heyl", logo: AndreasHeyl, link:"dummy", imageClasses:""},
  
  const partners = [
    { name: "Biolabs",domain:"biolabs.io", description: "Pan-European Network", link:"dummy", imageClasses:"invert scale-[2] contrast-[4]"},
    { name: "Berlin Partner GmbH",domain:"berlin-partner.de", description: "Innovation Accelerator", link:"dummy", imageClasses:"invert scale-[1.2]"},
    { name: "Life Sciences Tech Network Berlin", logoNA:logoNA, description: "Industry Connection", link:"dummy", imageClasses:"translate-y-6 scale-[1.3] invert"},
    { name: "Nucleate",domain:"nucleate.org", description: "Sustainability Partner", link:"dummy", imageClasses:""},
    { name: "Amino Collective",domain:"aminocollective.com", description: "Startup Community", link:"dummy", imageClasses:"scale-[1.7]"},
    { name: "FoodLabs",domain:"foodlabs.com", description: "Commercialization Support", link:"dummy", imageClasses:""},
    { name: "Biocatalyst Foundation",domain:"biocatalyst.eu", description: "Commercialization Support", link:"dummy", imageClasses:"brightness-[1] scale-[1.5]"},
    { name: "BCG",domain:"bcg.com", description: "", link:"dummy", imageClasses:"contrast-[10] scale-[1.8] "},
    { name: "Mimotype",domain:"mimotype.org", description: "", link:"dummy", imageClasses:"invert"},

    // { name: "Vossius", logo: BioCircular, description: "", link:"dummy", imageClasses:""},
    // { name: "TWIST", logo: BioCircular, description: "", link:"dummy", imageClasses:""},
    // { name: "CDD Vault", logo: BioCircular, description: "", link:"dummy", imageClasses:""},
    // { name: "Provolute", logo: BioCircular, description: "", link:"dummy", imageClasses:""},
    // { name: "Xynabio", logo: BioCircular, description: "", link:"dummy", imageClasses:""},
    // { name: "SPRIND", logo: BioCircular, description: "", link:"dummy", imageClasses:""},
    // { name: "Idealab", logo: BioCircular, description: "", link:"dummy", imageClasses:""},
    // { name: "Innovationsbank Berlin", logo: BioCircular, description: "", link:"dummy", imageClasses:""},
    // { name: "Sparkasse", logo: BioCircular, description: "", link:"dummy", imageClasses:""},
    // { name: "Volksbank", logo: BioCircular, description: "", link:"dummy", imageClasses:""},
    // { name: "WFBB", logo: BioCircular, description: "", link:"dummy", imageClasses:""},
    // { name: "Promega", logo: BioCircular, description: "", link:"dummy", imageClasses:""},
  ]
  
  
  
  
  const silverSponsors = [
    { name: "BioCircular ", logo: BioCircular, link:"dummy", imageClasses:""},
    { name: "BioCircular ", logo: BioCircular, link:"dummy", imageClasses:""},
    { name: "BioCircular ", logo: BioCircular, link:"dummy", imageClasses:""},
    { name: "BioCircular ", logo: BioCircular, link:"dummy", imageClasses:""},
    { name: "BioCircular ", logo: BioCircular, link:"dummy", imageClasses:""},
    { name: "BioCircular ", logo: BioCircular, link:"dummy", imageClasses:""},
    { name: "BioCircular ", logo: BioCircular, link:"dummy", imageClasses:""},
    { name: "BioCircular ", logo: BioCircular, link:"dummy", imageClasses:""},
    
  ]
  
  const connectors = [
    { name: "Dr. Sarah Weber", role: "Biotech Investment Expert", link:"dummy", imageClasses:""},
    { name: "Prof. Michael Schmidt", role: "Synthetic Biology Pioneer", link:"dummy", imageClasses:""},
    { name: "Anna Hoffmann", role: "Industry Relations", link:"dummy", imageClasses:""},
    { name: "Dr. Thomas Klein", role: "Research Translation", link:"dummy", imageClasses:""},
    { name: "Lisa Müller", role: "Startup Ecosystem Builder", link:"dummy", imageClasses:""},
    { name: "Dr. Andreas Berg", role: "Innovation Advisor", link:"dummy", imageClasses:""},
  ]


  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <div className="inline-block group">
              <Badge variant="outline" className="p-1 px-2 border-muted-foreground/40 text-muted-foreground group-hover:border-primary group-hover:text-primary font-mono uppercase tracking-wider">
                Partner Program
              </Badge>
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center">
                <h2 className="w-fit text-3xl font-anton font-black md:text-6xl lg:text-7xl tracking-tight uppercase text-left">Our Network of <br/>
                    <span className="text-8xl text-primary">Supporters</span>
                    <p className="ml-2 font-quicksand text-muted-foreground max-w-3xl font-light text-sm md:text-md text-left tracking-widest">
                      sponsors, partners, and other contributors
                    </p>
                    </h2>
            </div>

          </div>
        </div>
      </section>

      {/* Main Sponsors */}
      <section className="py-20 px-4 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16 flex flex-col items-center justify-center">
            {/* <div className="flex justify-center items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Gold Tier</span> 
              </div>
            </div> */}
            <h2 className="w-fit text-3xl font-anton font-black md:text-6xl lg:text-7xl tracking-tight uppercase text-left relative">
                <Badge variant="outline" className="absolute p-1 px-2 top-8 left-1/2 -translate-x-1/2 border-muted-foreground/40 text-muted-foreground 
                group-hover:border-primary group-hover:text-primary font-mono uppercase tracking-wider text-center">
                <Rocket className="w-5 h-5 text-primary" />Thanks to</Badge> 
              <br/>Our main <br/>
                    <span className="text-8xl text-primary">Sponsors</span>
                    <p className="font-quicksand text-muted-foreground max-w-3xl font-light text-sm md:text-md text-left tracking-widest ">
                      supporting this years summit <br/>
                    </p>
                    </h2>
          </div>

          <div className="flex flex-row justify-between items-center mx-auto w-fit max-w-5xl gap-10 px-14">
            {mainSponsors.map((sponsor, index) => (
              <Card
                key={index}
                className="bg-card border-[0.8px] border-muted-foreground/30 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 
                h-36 aspect-video max-w-[250px] group p-4 relative" >
                  <a href={sponsor.link} className="">
                <CardContent className="flex items-center justify-center h-full w-full aspect-video  p-0 rounded-lg overflow-hidden">
                    <img
                      src={sponsor.logo.src || "@/assets/partners-logos/placeholder.svg"}
                      alt={sponsor.name}
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity grayscale brightness-[4]"
                      />
                      {/* Company name badge */}
                      <Badge variant="outline" 
                      className="absolute -bottom-4 left-4 p-1 px-2 bg-black/50 border-muted-foreground/30 group-hover:border-primary text-muted-foreground group-hover:text-primary font-mono uppercase tracking-wider">
                        {sponsor.name}
                      </Badge>
                </CardContent>
              </a>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-6 w-full max-w-5xl mx-auto mt-24 px-14">
            {supportingSponsors.map((supSponsor, index) => (
              <Card
                key={index}
                className="bg-card border-[0.8px] border-muted-foreground/30 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 
                aspect-video max-w-[250px] group p-4 relative"
              >
                <a href={supSponsor.link} className="">
                  <CardContent className="flex items-center justify-center h-full w-full aspect-video p-0 rounded-lg overflow-hidden">
                    <img
                      src={supSponsor.logo.src || "@/assets/partners-logos/placeholder.svg"}
                      alt={supSponsor.name}
                      className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity grayscale brightness-[4]"
                    />
                    {/* Company name badge */}
                    <Badge 
                      variant="outline"
                      className="absolute bg-card -bottom-4 left-4 p-1 px-2 border-[0.5px] border-muted-foreground/30
                      group-hover:border-primary group-hover:border text-[0.6rem] 
                      text-muted-foreground group-hover:text-primary font-mono uppercase tracking-wider"
                    >
                      {supSponsor.name}
                    </Badge>
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Silver Sponsors */}
      {/* TODO: hide silver tier */}
      {/* <section className="py-20 px-4 lg:px-8 hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Silver Tier</span>
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center">
                <h2 className="w-fit text-3xl font-anton font-black md:text-6xl lg:text-7xl tracking-tight uppercase text-left">Info Flyer for<br/>
                    <span className="text-8xl text-primary">Silver Tier</span>
                    <p className="font-quicksand text-muted-foreground max-w-3xl font-light text-sm md:text-md text-left tracking-widest">
                      Organizations championing synthetic biology advancement
                    </p>
                    </h2>
            </div>
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
                      src={sponsor.logo.src || "@/assets/partners-logos/placeholder.svg"}
                      alt={sponsor.name}
                      className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Advisory Board */}
      <section className="py-20 px-4 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">

          <div className="text-center space-y-6 pb-16 ">
            <div className="inline-block">
            <Badge variant="outline" className="p-1 px-2 border-muted-foreground/40 text-muted-foreground group-hover:border-primary group-hover:text-primary font-mono uppercase tracking-wider">
              <Users2 className="w-5 h-5 text-primary" />Advisory Board
              </Badge>
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center">
              <h2 className="w-fit text-3xl font-anton font-black md:text-6xl lg:text-7xl tracking-tight uppercase text-left">
                Meet our <br/>
                <span className="text-8xl text-primary">Advisors</span>
                <p className="font-quicksand text-muted-foreground max-w-3xl font-light text-sm md:text-md text-left tracking-widest">
                  Supporting us with their expertise and insights
                </p>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 gap-x-14 px-14 max-w-xl md:max-w-4xl lg:max-w-5xl 2xl:max-w-6xl mx-auto">
            {advisoryBoard.map((advisor, index) => {
              return (
                <Card
                  key={index}
                  className="bg-card border-border hover:border-primary/50 transition-all hover:shadow-md relative overflow-hidden pb-0"
                  > 
                  {/* <a href={advisor.link} target="_blank" rel="noopener noreferrer" >
                    <Badge variant="outline" className="relative border-muted-foreground text-muted-foreground font-anton uppercase tracking-wider opacity-75 text-center 
                    hover:pl-6 hover:text-black hover:bg-primary hover:border-black hover:font-black transition-all duration-300 group-hover:scale-110 group">
                    <Link className="w-8 h-8 absolute my-auto left-2 text-transparent group-hover:text-black group-hover:scale-150 transition-all duration-300" />
                    SBR2026</Badge>
                  </a> */}
                  <img src={advisor.image.src || "@/assets/partners-logos/placeholder.svg"} alt={advisor.name} 
                  className="w-full h-full object-contain absolute bottom-0 left-1/4 
                  bg-conic-10 from-primary via-transparent to-transparent pointer-events-none" />
                  <CardContent className="h-full group">
                    <div className="flex items-start h-full">
                      <div className="flex flex-col justify-between items-start space-y-4 h-full">
                        <h3 className="lg:w-1/3 2xl:w-full text-3xl font-anton font-bold">{advisor.name}
                        <p className="text-sm text-muted-foreground font-quicksand font-light">{advisor.company}</p>
                        </h3>
                      <div className="inline-flex items-center mt-2 gap-2 py-1.5 rounded-lg">
                        {/* social media icons and links */}
                        <div className="inline-flex items-center gap-3 p-0.5 text-muted-foreground pb-2">

                          {/* Weblink */}
                          {/* <a href={advisor.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <Link className="w-5 h-5" />
                          </a> */}

                          {/* LinkedIn */}
                          <a href={advisor.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <Linkedin className="w-5 h-5 text-primary/70 hover:fill-primary" />
                          </a>

                          {/* Twitter */}
                          <a href={advisor.twitterX} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <Twitter className="w-5 h-5 opacity-70 hover:opacity-100 hover:fill-current/30" />
                          </a>

                          {/* Instagram */}
                          {/* <a href={advisor.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <Instagram className="w-5 h-5" />
                          </a> */}
                        </div>
                      </div>
                    </div>
                      </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ecosystem partners */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 pb-16 px-14">
            <div className="inline-block">
              <Badge variant="outline" className="p-1 px-2 border-muted-foreground/40 text-muted-foreground group-hover:border-primary group-hover:text-primary font-mono uppercase tracking-wider">
                <Unplug className="w-5 h-5 text-primary" />Ecosystem Partners
              </Badge>
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center">
              <h2 className="w-fit text-3xl font-anton font-black md:text-6xl lg:text-7xl tracking-tight uppercase text-left">
                Thanks to our <br/>
                <span className="text-8xl text-primary">Partners</span>
                <p className="font-quicksand text-muted-foreground max-w-3xl font-light text-sm md:text-md text-left tracking-widest">
                  for amplifying our overall impact
                </p>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 w-full max-w-5xl mx-auto mt-24 px-14">
            {partners.map((partner, index) => (
              <Card
                key={index}
                className="bg-card hover:bg-black border-[0.8px] border-muted-foreground/30 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 
                aspect-video max-w-[250px] group p-4 relative"
              >
                <div className="bg-primary w-[90%] h-[90%] absolute top-1 left-2 z-10 opacity-0 mix-blend-multiply group-hover:opacity-100 transition-opacity duration-300" />
                <a href={partner.link} className="">
                  <CardContent id={`${partner.name} Logo`} className="flex items-center justify-center h-full w-full aspect-video p-0 rounded-lg overflow-hidden bac">
                    <img
                      src={partner.logoNA || `https://img.logo.dev/${partner.domain}?token=pk_RfMRuwDLQme4qwss9CJbiA&format=webp&retina=true`}
                      alt={partner.name}
                      className={`w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity 
                      saturate-[0] brightness-[1] contrast-[2] mix-blend-screen ${partner.imageClasses}`}
                    />
                    {/* Company name badge */}
                    <Badge 
                      variant="outline"
                      className="absolute bg-card -bottom-4 left-4 p-1 px-2 border-[0.5px] border-muted-foreground/30
                      group-hover:border-primary group-hover:border text-[0.6rem] 
                      text-muted-foreground group-hover:text-primary font-mono uppercase tracking-wider"
                    >
                      {partner.name}
                    </Badge>
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>

          <div className="hidden md:grid-cols-2 lg:grid-cols-3 gap-4 px-14">
            {partners.map((collaborator, index) => (
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

      {/* Connectors - show when you got at least three connectors */}
      <section className="py-20 px-4 lg:px-8 bg-card/30 hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Link2 className="w-5 h-5 text-primary" />
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
    </>
  )
}

