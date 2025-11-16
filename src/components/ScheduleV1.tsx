"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from "react"

// Time slots for the schedule
const timeSlots = [
  "09:00 - 09:45",
  "10:00 - 10:45",
  "11:00 - 11:45",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 14:45",
  "15:00 - 15:45",
  "16:00 - 16:45",
  "17:00 - 17:45",
]

// Room names
const rooms = ["Betonhalle Main", "Silent Green A", "Silent Green B", "Workshop Room 1", "Workshop Room 2"]

// Schedule data for Day 1
const day1Schedule = {
  "09:00 - 09:45": {
    "Betonhalle Main": {
      title: "Opening Keynote: The Future of Synthetic Biology",
      host: "Dr. Sarah Chen",
      affiliation: "Max Planck Institute",
      capacity: 500,
      tags: ["Keynote", "All Levels", "Vision"],
      type: "keynote",
      description:
        "Join us for an inspiring keynote exploring the next decade of synthetic biology innovations, from AI-designed organisms to sustainable bio-production at scale.",
    },
    "Silent Green A": null,
    "Silent Green B": null,
    "Workshop Room 1": null,
    "Workshop Room 2": null,
  },
  "10:00 - 10:45": {
    "Betonhalle Main": {
      title: "Panel: AI x Synthetic Biology",
      host: "Prof. Michael Weber",
      affiliation: "TU Berlin",
      capacity: 500,
      tags: ["Panel", "Advanced", "AI"],
      type: "panel",
      description:
        "Explore how machine learning and AI are revolutionizing genetic circuit design, protein engineering, and metabolic pathway optimization.",
    },
    "Silent Green A": {
      title: "Fireside Chat: Scaling from Lab to Market",
      host: "Anna Kowalski",
      affiliation: "GeneTech Solutions",
      capacity: 80,
      tags: ["Fireside", "Intermediate", "Business"],
      type: "fireside",
      description:
        "An intimate conversation about the challenges and strategies for scaling synthetic biology innovations from laboratory discoveries to commercial products.",
    },
    "Silent Green B": {
      title: "Workshop: CRISPR Design Fundamentals",
      host: "Dr. James Morrison",
      affiliation: "CRISPRLab",
      capacity: 40,
      tags: ["Workshop", "Beginner", "Technical"],
      type: "workshop",
      description:
        "Hands-on workshop covering the basics of CRISPR-Cas9 design, including guide RNA selection, off-target analysis, and experimental validation strategies.",
    },
    "Workshop Room 1": {
      title: "Group Discussion: Bio Defense Strategies",
      host: "Lisa Andersson",
      affiliation: "BioCircular",
      capacity: 30,
      tags: ["Discussion", "Advanced", "Security"],
      type: "discussion",
      description:
        "Small group discussion on biosecurity frameworks, dual-use research concerns, and responsible innovation in synthetic biology.",
    },
    "Workshop Room 2": {
      title: "Workshop: Metabolic Modeling Basics",
      host: "Dr. Raj Patel",
      affiliation: "Novozymes",
      capacity: 35,
      tags: ["Workshop", "Intermediate", "Modeling"],
      type: "workshop",
      description:
        "Learn the fundamentals of constraint-based metabolic modeling, flux balance analysis, and how to predict cellular behavior for strain optimization.",
    },
  },
  "11:00 - 11:45": {
    "Betonhalle Main": {
      title: "Startup Pitches: Session 1",
      host: "Competition Host",
      affiliation: "GASB",
      capacity: 500,
      tags: ["Pitching", "All Levels", "Startups"],
      type: "keynote",
      description:
        "Watch innovative synthetic biology startups pitch their groundbreaking solutions to expert judges and investors. First batch of 5 companies presenting.",
    },
    "Silent Green A": {
      title: "Fireside Chat: Green Chemistry Revolution",
      host: "Prof. Elena Schmidt",
      affiliation: "Fraunhofer Institute",
      capacity: 80,
      tags: ["Fireside", "Intermediate", "Sustainability"],
      type: "fireside",
      description:
        "Discussion on how synthetic biology is enabling sustainable chemical production, reducing environmental impact, and creating circular bio-economies.",
    },
    "Silent Green B": {
      title: "Workshop: Bioreactor Design Principles",
      host: "Dr. Marcus Johnson",
      affiliation: "BioScale Systems",
      capacity: 40,
      tags: ["Workshop", "Advanced", "Engineering"],
      type: "workshop",
      description:
        "Deep dive into bioreactor design considerations including mass transfer, mixing, oxygen delivery, and scale-up challenges for microbial fermentation.",
    },
    "Workshop Room 1": {
      title: "Group Discussion: Regulatory Pathways",
      host: "Maria Rodriguez",
      affiliation: "EMA Biotech",
      capacity: 30,
      tags: ["Discussion", "Intermediate", "Regulatory"],
      type: "discussion",
      description:
        "Navigate the complex regulatory landscape for synthetic biology products in Europe, including GMO regulations, novel food approvals, and biosafety requirements.",
    },
    "Workshop Room 2": {
      title: "Workshop: Synthetic Promoter Engineering",
      host: "Dr. Kevin Lee",
      affiliation: "SynPromoter Inc",
      capacity: 35,
      tags: ["Workshop", "Advanced", "Gene Expression"],
      type: "workshop",
      description:
        "Learn techniques for designing and characterizing synthetic promoters, including directed evolution, rational design, and high-throughput screening approaches.",
    },
  },
  "12:00 - 13:00": {
    "Betonhalle Main": {
      title: "Lunch Break & Networking",
      host: "Open Networking",
      affiliation: "GASB",
      capacity: 500,
      tags: ["Networking", "All Levels", "Social"],
      type: "break",
      description:
        "Grab lunch and connect with fellow attendees, speakers, and investors. Food stations located throughout the venue.",
    },
    "Silent Green A": null,
    "Silent Green B": null,
    "Workshop Room 1": null,
    "Workshop Room 2": null,
  },
  "13:00 - 14:00": {
    "Betonhalle Main": null,
    "Silent Green A": {
      title: "SynBio World Café: Discussion Tables",
      host: "Various Hosts",
      affiliation: "GASB Community",
      capacity: 80,
      tags: ["Discussion", "All Levels", "Community"],
      type: "discussion",
      description:
        "Rotating small group discussions on key synthetic biology topics. Move between tables to engage with different themes and community members.",
    },
    "Silent Green B": null,
    "Workshop Room 1": null,
    "Workshop Room 2": null,
  },
  "14:00 - 14:45": {
    "Betonhalle Main": {
      title: "Panel: Sustainable Supply Chains",
      host: "Anna Kowalski",
      affiliation: "GeneTech Solutions",
      capacity: 500,
      tags: ["Panel", "Intermediate", "Supply Chain"],
      type: "panel",
      description:
        "Expert panel discussing how to build resilient, decentralized bio-production systems that reduce dependency on traditional chemical supply chains.",
    },
    "Silent Green A": {
      title: "Fireside Chat: Founding a BioStartup",
      host: "Tom Anderson",
      affiliation: "BioVentures Capital",
      capacity: 80,
      tags: ["Fireside", "Beginner", "Entrepreneurship"],
      type: "fireside",
      description:
        "Practical advice for aspiring biotech entrepreneurs on team building, fundraising strategies, and common pitfalls to avoid when launching a synthetic biology startup.",
    },
    "Silent Green B": {
      title: "Workshop: Cell-Free Systems",
      host: "Dr. Sophie Turner",
      affiliation: "CellFree Labs",
      capacity: 40,
      tags: ["Workshop", "Intermediate", "Technology"],
      type: "workshop",
      description:
        "Introduction to cell-free protein synthesis systems, their applications in rapid prototyping, and advantages over traditional cell-based production methods.",
    },
    "Workshop Room 1": {
      title: "Group Discussion: IP Strategy for Biotech",
      host: "David Chen",
      affiliation: "BioPatents LLP",
      capacity: 30,
      tags: ["Discussion", "Advanced", "Legal"],
      type: "discussion",
      description:
        "Strategic discussion on intellectual property protection for synthetic biology innovations, including patents, trade secrets, and freedom to operate analysis.",
    },
    "Workshop Room 2": {
      title: "Workshop: DNA Assembly Techniques",
      host: "Dr. Nina Patel",
      affiliation: "AssemblyBio",
      capacity: 35,
      tags: ["Workshop", "Intermediate", "Cloning"],
      type: "workshop",
      description:
        "Comparison of modern DNA assembly methods including Gibson, Golden Gate, and SLIC, with practical tips for choosing the right approach for your project.",
    },
  },
  "15:00 - 15:45": {
    "Betonhalle Main": {
      title: "Keynote: Scaling Challenges in SynBio",
      host: "Prof. Michael Weber",
      affiliation: "TU Berlin",
      capacity: 500,
      tags: ["Keynote", "All Levels", "Scaling"],
      type: "keynote",
      description:
        "Exploring the technical, economic, and organizational challenges of scaling synthetic biology from laboratory prototypes to industrial manufacturing.",
    },
    "Silent Green A": {
      title: "Fireside Chat: Investor Perspectives",
      host: "Sarah Martinez",
      affiliation: "DeepTech Ventures",
      capacity: 80,
      tags: ["Fireside", "Intermediate", "Investment"],
      type: "fireside",
      description:
        "Hear from leading biotech investors about what they look for in synthetic biology startups, current investment trends, and the future of biotech funding.",
    },
    "Silent Green B": {
      title: "Workshop: Protein Engineering 101",
      host: "Dr. Robert Kim",
      affiliation: "ProteinDesign Corp",
      capacity: 40,
      tags: ["Workshop", "Beginner", "Protein"],
      type: "workshop",
      description:
        "Introduction to protein engineering approaches including directed evolution, rational design, and computational methods for improving enzyme properties.",
    },
    "Workshop Room 1": {
      title: "Group Discussion: Ethical Boundaries",
      host: "Prof. Lisa Werner",
      affiliation: "Ethics Institute Berlin",
      capacity: 30,
      tags: ["Discussion", "All Levels", "Ethics"],
      type: "discussion",
      description:
        "Open discussion on ethical considerations in synthetic biology research, including human genome editing, environmental release, and societal implications.",
    },
    "Workshop Room 2": {
      title: "Workshop: High-Throughput Screening",
      host: "Dr. Ahmed Hassan",
      affiliation: "AutomationBio",
      capacity: 35,
      tags: ["Workshop", "Advanced", "Automation"],
      type: "workshop",
      description:
        "Learn about designing and implementing high-throughput screening workflows for strain optimization, including robotics, microfluidics, and data analysis.",
    },
  },
  "16:00 - 16:45": {
    "Betonhalle Main": {
      title: "Startup Pitches: Session 2",
      host: "Competition Host",
      affiliation: "GASB",
      capacity: 500,
      tags: ["Pitching", "All Levels", "Startups"],
      type: "keynote",
      description:
        "Second round of startup presentations featuring 5 more innovative synthetic biology companies competing for prizes and investor attention.",
    },
    "Silent Green A": {
      title: "Fireside Chat: Academic to Industry",
      host: "Dr. Jennifer Wu",
      affiliation: "BioTransfer Office",
      capacity: 80,
      tags: ["Fireside", "Intermediate", "Career"],
      type: "fireside",
      description:
        "Insights on transitioning from academic research to industry roles, including career paths, skill development, and navigating the biotech job market.",
    },
    "Silent Green B": {
      title: "Workshop: Genome Mining Strategies",
      host: "Prof. Thomas Berg",
      affiliation: "Natural Products Lab",
      capacity: 40,
      tags: ["Workshop", "Advanced", "Discovery"],
      type: "workshop",
      description:
        "Learn computational and experimental approaches for discovering novel biosynthetic gene clusters and natural product pathways from genomic data.",
    },
    "Workshop Room 1": {
      title: "Group Discussion: Partnership Models",
      host: "Anna Kowalski",
      affiliation: "GeneTech Solutions",
      capacity: 30,
      tags: ["Discussion", "Intermediate", "Collaboration"],
      type: "discussion",
      description:
        "Discuss effective models for academic-industry partnerships, technology licensing, and collaborative research agreements in synthetic biology.",
    },
    "Workshop Room 2": {
      title: "Workshop: Biosensor Development",
      host: "Dr. Carlos Mendez",
      affiliation: "SensorBio Labs",
      capacity: 35,
      tags: ["Workshop", "Intermediate", "Sensors"],
      type: "workshop",
      description:
        "Design principles for creating genetically encoded biosensors, including transcription factor engineering, fluorescent reporters, and dynamic range optimization.",
    },
  },
  "17:00 - 17:45": {
    "Betonhalle Main": {
      title: "Day 1 Closing & Networking Reception",
      host: "GASB Team",
      affiliation: "GASB",
      capacity: 500,
      tags: ["Networking", "All Levels", "Social"],
      type: "break",
      description:
        "Join us for drinks and continued networking. Recap of Day 1 highlights and preview of Day 2 programming.",
    },
    "Silent Green A": null,
    "Silent Green B": null,
    "Workshop Room 1": null,
    "Workshop Room 2": null,
  },
}

// Schedule data for Day 2
const day2Schedule = {
  "09:00 - 09:45": {
    "Betonhalle Main": {
      title: "Keynote: Bio Defense in the Age of Engineered Biology",
      host: "Dr. Emma Richardson",
      affiliation: "Biosecurity Council",
      capacity: 500,
      tags: ["Keynote", "All Levels", "Security"],
      type: "keynote",
      description:
        "Examining biosecurity challenges and solutions as synthetic biology capabilities expand, including detection systems, attribution, and governance frameworks.",
    },
    "Silent Green A": null,
    "Silent Green B": null,
    "Workshop Room 1": null,
    "Workshop Room 2": null,
  },
  "10:00 - 10:45": {
    "Betonhalle Main": {
      title: "Panel: From Dependency to Decentralization",
      host: "Lisa Andersson",
      affiliation: "BioCircular",
      capacity: 500,
      tags: ["Panel", "Intermediate", "Supply Chain"],
      type: "panel",
      description:
        "Panel discussion on how distributed biomanufacturing can reduce supply chain vulnerabilities and enable local production of critical materials.",
    },
    "Silent Green A": {
      title: "Fireside Chat: Building Biotech Hubs",
      host: "Dr. Martin Schulz",
      affiliation: "Berlin BioTech Park",
      capacity: 80,
      tags: ["Fireside", "Intermediate", "Ecosystem"],
      type: "fireside",
      description:
        "Conversation about creating thriving biotech innovation ecosystems, including infrastructure, talent development, and community building strategies.",
    },
    "Silent Green B": {
      title: "Workshop: RNA Engineering Basics",
      host: "Dr. Yuki Tanaka",
      affiliation: "RNATech Institute",
      capacity: 40,
      tags: ["Workshop", "Intermediate", "RNA"],
      type: "workshop",
      description:
        "Introduction to RNA-based tools in synthetic biology including riboswitches, RNA aptamers, and CRISPR guide RNA design for gene regulation.",
    },
    "Workshop Room 1": {
      title: "Group Discussion: Climate Tech x SynBio",
      host: "Prof. Hans Mueller",
      affiliation: "Climate Solutions Lab",
      capacity: 30,
      tags: ["Discussion", "All Levels", "Climate"],
      type: "discussion",
      description:
        "Explore opportunities for synthetic biology to address climate change through carbon capture, sustainable materials, and alternative protein production.",
    },
    "Workshop Room 2": {
      title: "Workshop: Microbiome Engineering",
      host: "Dr. Priya Singh",
      affiliation: "MicrobiomeTech",
      capacity: 35,
      tags: ["Workshop", "Advanced", "Microbiome"],
      type: "workshop",
      description:
        "Advanced techniques for engineering microbial communities, including consortium design, metabolic cross-feeding, and stability analysis.",
    },
  },
  "11:00 - 11:45": {
    "Betonhalle Main": {
      title: "Startup Pitches: Session 3",
      host: "Competition Host",
      affiliation: "GASB",
      capacity: 500,
      tags: ["Pitching", "All Levels", "Startups"],
      type: "keynote",
      description:
        "Third and final round of startup pitches. See the remaining 5 companies present their innovations before the judges deliberate.",
    },
    "Silent Green A": {
      title: "Fireside Chat: Women in Biotech Leadership",
      host: "Dr. Rebecca Foster",
      affiliation: "BioWomen Network",
      capacity: 80,
      tags: ["Fireside", "All Levels", "Diversity"],
      type: "fireside",
      description:
        "Inspiring conversation about advancing gender equity in biotech, featuring successful women leaders sharing their experiences and advice.",
    },
    "Silent Green B": {
      title: "Workshop: Bioprocess Optimization",
      host: "Dr. Klaus Weber",
      affiliation: "ProcessBio GmbH",
      capacity: 40,
      tags: ["Workshop", "Advanced", "Manufacturing"],
      type: "workshop",
      description:
        "Statistical approaches to bioprocess optimization including design of experiments (DoE), response surface methodology, and quality by design principles.",
    },
    "Workshop Room 1": {
      title: "Group Discussion: Open Source in SynBio",
      host: "Jake Morrison",
      affiliation: "OpenBio Initiative",
      capacity: 30,
      tags: ["Discussion", "Intermediate", "Open Source"],
      type: "discussion",
      description:
        "Discussion on the role of open-source tools, standardized parts, and shared resources in accelerating synthetic biology innovation.",
    },
    "Workshop Room 2": {
      title: "Workshop: Strain Engineering Workflows",
      host: "Dr. Isabella Romano",
      affiliation: "StrainLab",
      capacity: 35,
      tags: ["Workshop", "Intermediate", "Strain Design"],
      type: "workshop",
      description:
        "End-to-end workflows for microbial strain engineering including DBTL cycles, genomic integration strategies, and production strain development.",
    },
  },
  "12:00 - 13:00": {
    "Betonhalle Main": {
      title: "Lunch Break & Poster Session",
      host: "Open Networking",
      affiliation: "GASB",
      capacity: 500,
      tags: ["Networking", "All Levels", "Posters"],
      type: "break",
      description:
        "Lunch and poster presentations from researchers and startups. Browse innovative projects while networking with the community.",
    },
    "Silent Green A": null,
    "Silent Green B": null,
    "Workshop Room 1": null,
    "Workshop Room 2": null,
  },
  "13:00 - 14:00": {
    "Betonhalle Main": null,
    "Silent Green A": {
      title: "SynBio World Café: Deep Dive Sessions",
      host: "Various Hosts",
      affiliation: "GASB Community",
      capacity: 80,
      tags: ["Discussion", "All Levels", "Community"],
      type: "discussion",
      description:
        "Continued rotating discussions with new topics. Engage in deeper conversations about challenges and opportunities in synthetic biology.",
    },
    "Silent Green B": null,
    "Workshop Room 1": null,
    "Workshop Room 2": null,
  },
  "14:00 - 14:45": {
    "Betonhalle Main": {
      title: "Panel: Bridging the Valley of Death",
      host: "Sarah Martinez",
      affiliation: "DeepTech Ventures",
      capacity: 500,
      tags: ["Panel", "Intermediate", "Commercialization"],
      type: "panel",
      description:
        "Expert panel addressing the challenges of translating synthetic biology research into commercial products and strategies for de-risking early-stage technologies.",
    },
    "Silent Green A": {
      title: "Fireside Chat: Corporate Innovation in SynBio",
      host: "Dr. Raj Patel",
      affiliation: "Novozymes",
      capacity: 80,
      tags: ["Fireside", "Intermediate", "Corporate"],
      type: "fireside",
      description:
        "How large corporations are innovating in synthetic biology through internal R&D, startup partnerships, and open innovation programs.",
    },
    "Silent Green B": {
      title: "Workshop: Computational Protein Design",
      host: "Prof. Alice Zhang",
      affiliation: "AI Protein Lab",
      capacity: 40,
      tags: ["Workshop", "Advanced", "AI"],
      type: "workshop",
      description:
        "Hands-on introduction to machine learning tools for protein design including AlphaFold, RoseTTAFold, and generative models for novel enzymes.",
    },
    "Workshop Room 1": {
      title: "Group Discussion: Global SynBio Policy",
      host: "Dr. Pierre Dubois",
      affiliation: "EU BioPolicy",
      capacity: 30,
      tags: ["Discussion", "Advanced", "Policy"],
      type: "discussion",
      description:
        "International perspectives on synthetic biology regulation, harmonization efforts, and the role of policy in enabling responsible innovation.",
    },
    "Workshop Room 2": {
      title: "Workshop: Omics Data Analysis",
      host: "Dr. Sofia Ivanova",
      affiliation: "BioinfoLab",
      capacity: 35,
      tags: ["Workshop", "Intermediate", "Bioinformatics"],
      type: "workshop",
      description:
        "Practical approaches to analyzing multi-omics data from engineered strains including transcriptomics, proteomics, and metabolomics integration.",
    },
  },
  "15:00 - 15:45": {
    "Betonhalle Main": {
      title: "Keynote: Green Chemistry Meets Synthetic Biology",
      host: "Prof. Elena Schmidt",
      affiliation: "Fraunhofer Institute",
      capacity: 500,
      tags: ["Keynote", "All Levels", "Sustainability"],
      type: "keynote",
      description:
        "Exploring the convergence of green chemistry principles and synthetic biology to create truly sustainable chemical manufacturing processes.",
    },
    "Silent Green A": {
      title: "Fireside Chat: Deep Tech Fundraising",
      host: "Tom Anderson",
      affiliation: "BioVentures Capital",
      capacity: 80,
      tags: ["Fireside", "Intermediate", "Fundraising"],
      type: "fireside",
      description:
        "Practical fundraising advice for deep tech biotech startups including investor targeting, pitch preparation, and navigating due diligence.",
    },
    "Silent Green B": {
      title: "Workshop: Synthetic Biology Safety",
      host: "Dr. Michael Brown",
      affiliation: "BioSafety Consulting",
      capacity: 40,
      tags: ["Workshop", "Beginner", "Safety"],
      type: "workshop",
      description:
        "Essential biosafety principles for synthetic biology labs including risk assessment, containment strategies, and compliance with regulations.",
    },
    "Workshop Room 1": {
      title: "Group Discussion: Alternative Proteins",
      host: "Dr. Laura Chen",
      affiliation: "FoodTech Innovations",
      capacity: 30,
      tags: ["Discussion", "Intermediate", "Food Tech"],
      type: "discussion",
      description:
        "Discussion on using synthetic biology for alternative protein production including precision fermentation, cellular agriculture, and plant-based approaches.",
    },
    "Workshop Room 2": {
      title: "Workshop: Mammalian Cell Engineering",
      host: "Prof. Jonathan Lee",
      affiliation: "Cell Engineering Center",
      capacity: 35,
      tags: ["Workshop", "Advanced", "Cell Engineering"],
      type: "workshop",
      description:
        "Advanced techniques for engineering mammalian cells including CAR-T design, glycosylation engineering, and production of complex biologics.",
    },
  },
  "16:00 - 16:45": {
    "Betonhalle Main": {
      title: "Pitching Competition: Winners Announced",
      host: "GASB Team",
      affiliation: "GASB",
      capacity: 500,
      tags: ["Awards", "All Levels", "Celebration"],
      type: "keynote",
      description:
        "Judges announce the winners of the SynBio Reactor Startup Pitching Competition. Awards ceremony followed by winner presentations.",
    },
    "Silent Green A": {
      title: "Fireside Chat: Lessons from Failed Startups",
      host: "Panel of Founders",
      affiliation: "Various",
      capacity: 80,
      tags: ["Fireside", "Intermediate", "Lessons Learned"],
      type: "fireside",
      description:
        "Honest conversation about startup failures, lessons learned, and how to bounce back. Valuable insights from founders who've experienced both success and setbacks.",
    },
    "Silent Green B": {
      title: "Workshop: Biocontainment Strategies",
      host: "Dr. Ahmed Hassan",
      affiliation: "SafeBio Systems",
      capacity: 40,
      tags: ["Workshop", "Advanced", "Safety"],
      type: "workshop",
      description:
        "Genetic biocontainment approaches for engineered organisms including kill switches, auxotrophy, and semantic containment for environmental release.",
    },
    "Workshop Room 1": {
      title: "Group Discussion: Future of Biomanufacturing",
      host: "Dr. Klaus Weber",
      affiliation: "ProcessBio GmbH",
      capacity: 30,
      tags: ["Discussion", "All Levels", "Future Tech"],
      type: "discussion",
      description:
        "Speculative discussion on the future of biomanufacturing including continuous processes, AI-driven optimization, and distributed mini-factories.",
    },
    "Workshop Room 2": {
      title: "Workshop: Techno-Economic Analysis",
      host: "Dr. Nina Patel",
      affiliation: "BioEconomics Consulting",
      capacity: 35,
      tags: ["Workshop", "Intermediate", "Economics"],
      type: "workshop",
      description:
        "Learn how to perform techno-economic analysis for bioprocesses including cost modeling, sensitivity analysis, and market assessment.",
    },
  },
  "17:00 - 17:45": {
    "Betonhalle Main": {
      title: "Closing Keynote & Summit Wrap-Up",
      host: "Dr. Sarah Chen",
      affiliation: "GASB President",
      capacity: 500,
      tags: ["Keynote", "All Levels", "Closing"],
      type: "keynote",
      description:
        "Closing remarks reflecting on the summit highlights, key takeaways, and a vision for the future of the synthetic biology community. Followed by farewell reception.",
    },
    "Silent Green A": null,
    "Silent Green B": null,
    "Workshop Room 1": null,
    "Workshop Room 2": null,
  },
}

type Session = {
  title: string
  host: string
  affiliation: string
  capacity: number
  tags: string[]
  type: "keynote" | "panel" | "fireside" | "workshop" | "discussion" | "break"
  description: string
}

export default function ScheduleComponent() {
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1)
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set())

  const currentSchedule = selectedDay === 1 ? day1Schedule : day2Schedule

  const toggleSession = (sessionId: string) => {
    setExpandedSessions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(sessionId)) {
        newSet.delete(sessionId)
      } else {
        newSet.add(sessionId)
      }
      return newSet
    })
  }

  const getSessionColor = (type: Session["type"]) => {
    switch (type) {
      case "keynote":
        return "border-primary/50 bg-primary/5"
      case "panel":
        return "border-chart-2/50 bg-chart-2/5"
      case "fireside":
        return "border-chart-5/50 bg-chart-5/5"
      case "workshop":
        return "border-chart-4/50 bg-chart-4/5"
      case "discussion":
        return "border-chart-3/50 bg-chart-3/5"
      case "break":
        return "border-muted bg-muted/10"
      default:
        return "border-border bg-card"
    }
  }

  const getTagColor = (tag: string) => {
    if (tag === "Beginner") return "bg-green-500/10 text-green-500 border-green-500/30"
    if (tag === "Intermediate") return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
    if (tag === "Advanced") return "bg-red-500/10 text-red-500 border-red-500/30"
    return "bg-primary/10 text-primary border-primary/30"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <span className="text-sm font-mono text-primary uppercase tracking-wider">Event Schedule</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
              <span className="text-primary">SYNBIO REACTOR</span>
              <br />
              <span className="text-foreground">2026 SCHEDULE</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Two days of keynotes, panels, workshops, and networking across 5 parallel tracks
            </p>
            <div className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Jan 19-20, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Berlin, Germany</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day Selector */}
      <section className="pb-8 px-4 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setSelectedDay(1)}
              className={`font-semibold ${
                selectedDay === 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-card/80 border-2 border-border"
              }`}
            >
              Day 1 - Monday, Jan 19
            </Button>
            <Button
              size="lg"
              onClick={() => setSelectedDay(2)}
              className={`font-semibold ${
                selectedDay === 2
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-card/80 border-2 border-border"
              }`}
            >
              Day 2 - Tuesday, Jan 20
            </Button>
          </div>
        </div>
      </section>

      {/* Schedule Grid */}
      <section className="pb-20 px-4 lg:px-8">
        <div className="container mx-auto max-w-[1600px]">
          <div className="space-y-6">
            {timeSlots.map((timeSlot) => (
              <div key={timeSlot} className="space-y-3">
                {/* Time Header */}
                <div className="flex items-center gap-4">
                  <div className="font-mono text-sm text-primary font-bold min-w-[140px]">{timeSlot}</div>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Sessions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                  {rooms.map((room) => {
                    const session = currentSchedule[timeSlot as keyof typeof currentSchedule]?.[
                      room as keyof (typeof currentSchedule)[keyof typeof currentSchedule]
                    ] as Session | null

                    if (!session) {
                      return (
                        <div key={room} className="bg-muted/5 border border-dashed border-muted rounded-lg p-4 min-h-[120px]">
                          <p className="text-xs text-muted-foreground">{room}</p>
                        </div>
                      )
                    }

                    const sessionId = `${selectedDay}-${timeSlot}-${room}`
                    const isExpanded = expandedSessions.has(sessionId)
                    const isFullWidth = session.capacity >= 500

                    return (
                      <Card
                        key={room}
                        className={`${getSessionColor(session.type)} cursor-pointer transition-all hover:shadow-lg ${
                          isFullWidth ? "lg:col-span-5" : ""
                        } ${isExpanded ? "row-span-2" : ""}`}
                        onClick={() => toggleSession(sessionId)}
                      >
                        <CardContent className="pt-4 space-y-3">
                          {/* Room Label */}
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs text-muted-foreground font-medium">{room}</p>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            )}
                          </div>

                          {/* Session Title */}
                          <h3 className="font-bold text-sm leading-tight text-balance">{session.title}</h3>

                          {/* Host Info */}
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-primary">{session.host.charAt(0)}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-medium truncate">{session.host}</p>
                              <p className="text-xs text-muted-foreground truncate">{session.affiliation}</p>
                            </div>
                          </div>

                          {/* Capacity */}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            <span>Max {session.capacity}</span>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1">
                            {session.tags.map((tag, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className={`text-xs px-2 py-0 ${getTagColor(tag)}`}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Expanded Description */}
                          {isExpanded && (
                            <div className="pt-2 border-t border-border/50">
                              <p className="text-sm text-muted-foreground leading-relaxed">{session.description}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className="py-12 px-4 lg:px-8 bg-card/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6">
            <h3 className="text-xl font-bold">Session Types</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { type: "keynote", label: "Keynote" },
                { type: "panel", label: "Panel Discussion" },
                { type: "fireside", label: "Fireside Chat" },
                { type: "workshop", label: "Workshop" },
                { type: "discussion", label: "Group Discussion" },
              ].map(({ type, label }) => (
                <div
                  key={type}
                  className={`px-4 py-2 rounded-lg border ${getSessionColor(type as Session["type"])}`}
                >
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to Join Us?</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Secure your spot at Berlin's premier synthetic biology summit
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8"
          >
            Get Tickets
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 lg:px-8 border-t border-border">
        <div className="container mx-auto max-w-7xl">
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
