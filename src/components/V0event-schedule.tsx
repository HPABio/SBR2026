"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Presentation, MessageCircle, Wrench, Linkedin, Globe, Coffee } from "lucide-react"

type SessionFormat = "keynote" | "presentation" | "workshop" | "panel" | "discussion" | "networking"

interface Speaker {
  name: string
  role: string
  company: string
  avatar: string
  linkedIn?: string
}

interface Session {
  id: string
  startTime: string
  endTime: string
  title: string
  description?: string
  speakers?: Speaker[]
  topic?: string
  format: SessionFormat
  room: string
  isBreak?: boolean
  sponsors?: string[]
}

const formatIcons: Record<SessionFormat, React.ReactNode> = {
  keynote: <Presentation className="h-3.5 w-3.5" />,
  presentation: <Presentation className="h-3.5 w-3.5" />,
  workshop: <Wrench className="h-3.5 w-3.5" />,
  panel: <Users className="h-3.5 w-3.5" />,
  discussion: <MessageCircle className="h-3.5 w-3.5" />,
  networking: <Coffee className="h-3.5 w-3.5" />,
}

const formatLabels: Record<SessionFormat, string> = {
  keynote: "Keynote",
  presentation: "Presentation",
  workshop: "Workshop",
  panel: "Panel",
  discussion: "Discussion",
  networking: "Networking",
}

const companyLogos: Record<string, string> = {
  "Bergside LLC": "🏔️",
  Flowbite: "🌊",
  Meta: "Ⓜ️",
  Amazon: "📦",
  Bioweg: "🧬",
  Google: "🔍",
  Microsoft: "🪟",
}

const morningSessions: Session[] = [
  {
    id: "1",
    startTime: "07:00",
    endTime: "08:00",
    title: "Opening Remarks",
    description:
      "Welcoming attendees, introducing the purpose of the event, and set the tone for the rest of the proceedings.",
    speakers: [
      {
        name: "Jese Leos",
        role: "CEO & Co-Founder",
        company: "Bergside LLC",
        avatar: "/professional-man-suit.png",
        linkedIn: "https://linkedin.com",
      },
    ],
    topic: "Welcome",
    format: "keynote",
    room: "Main Hall",
  },
  {
    id: "2",
    startTime: "08:00",
    endTime: "09:00",
    title: "Bergside LLC: Controlling the Video Traffic Flows",
    description: "With an open scripting format for video manipulation, you can publish your own movie smarter.",
    speakers: [
      {
        name: "Lana Byrd",
        role: "Video Engineer",
        company: "Bergside LLC",
        avatar: "/professional-woman-glasses.png",
        linkedIn: "https://linkedin.com",
      },
    ],
    topic: "Video Tech",
    format: "presentation",
    room: "Room A",
  },
  {
    id: "3",
    startTime: "10:00",
    endTime: "11:00",
    title: "Flowbite - An Open Framework for Forensic Watermarking",
    description: "Start developing with an open-source library of over 450+ UI components, sections, and pages.",
    speakers: [
      {
        name: "Micheal Gough",
        role: "CTO",
        company: "Flowbite",
        avatar: "/man-with-beard-tech.jpg",
        linkedIn: "https://linkedin.com",
      },
      {
        name: "Karen Nelson",
        role: "React Developer",
        company: "Flowbite",
        avatar: "/woman-developer-smiling.jpg",
        linkedIn: "https://linkedin.com",
      },
    ],
    topic: "Open Source",
    format: "workshop",
    room: "Workshop Room 1",
  },
  {
    id: "4",
    startTime: "11:00",
    endTime: "11:30",
    title: "Coffee & Networking",
    isBreak: true,
    format: "networking",
    room: "Lobby",
    sponsors: ["Spotify", "Microsoft", "Slack", "Salesforce"],
  },
  {
    id: "5",
    startTime: "11:15",
    endTime: "12:15",
    title: "Lighthouse Keynote",
    description: "Scaling challenges and solutions for modern biotech startups.",
    speakers: [
      {
        name: "Prateek Mahalwar",
        role: "CEO",
        company: "Bioweg",
        avatar: "/indian-professional-man.png",
        linkedIn: "https://linkedin.com",
      },
    ],
    topic: "Scale Up",
    format: "keynote",
    room: "Betonhalle (Main Hall)",
  },
]

const afternoonSessions: Session[] = [
  {
    id: "6",
    startTime: "13:00",
    endTime: "14:00",
    title: "Women in Streaming Media Networking",
    description:
      "Our mission is to increase diversity and give more visibility to women leaders in the streaming media industry.",
    speakers: [
      {
        name: "Leslie Livingston",
        role: "CEO & Co-Founder",
        company: "Meta",
        avatar: "/professional-woman-executive.png",
        linkedIn: "https://linkedin.com",
      },
    ],
    topic: "Diversity",
    format: "panel",
    room: "Room B",
  },
  {
    id: "7",
    startTime: "14:00",
    endTime: "15:00",
    title: "Exploring the Balance Between Customer Acquisition and Retention",
    description: "It is easier and also cheaper to retain existing customers than onboard new ones.",
    speakers: [
      {
        name: "Helene Engels",
        role: "Senior VP",
        company: "Amazon",
        avatar: "/woman-executive-blonde.jpg",
        linkedIn: "https://linkedin.com",
      },
      {
        name: "Roberta Casas",
        role: "Head Designer",
        company: "Amazon",
        avatar: "/latina-designer.png",
        linkedIn: "https://linkedin.com",
      },
    ],
    topic: "Growth",
    format: "discussion",
    room: "Room C",
  },
  {
    id: "8",
    startTime: "15:00",
    endTime: "15:30",
    title: "Coffee Break",
    isBreak: true,
    format: "networking",
    room: "Lobby",
    sponsors: ["Spotify", "Microsoft", "Slack", "Salesforce"],
  },
  {
    id: "9",
    startTime: "15:30",
    endTime: "16:00",
    title: "Flowbite - An Open Framework for Forensic Watermarking",
    description: "Start developing with an open-source library of over 450+ UI components, sections, and pages.",
    speakers: [
      {
        name: "Micheal Gough",
        role: "CTO",
        company: "Flowbite",
        avatar: "/man-with-beard-tech.jpg",
        linkedIn: "https://linkedin.com",
      },
    ],
    topic: "Open Source",
    format: "presentation",
    room: "Room A",
  },
]

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="flex items-center gap-3 mt-3">
      <Avatar className="h-10 w-10 border-2 border-muted">
        <AvatarImage src={speaker.avatar || "/placeholder.svg"} alt={speaker.name} />
        <AvatarFallback>
          {speaker.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{speaker.name}</span>
          {speaker.linkedIn && (
            <a
              href={speaker.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 hover:text-sky-400 transition-colors group"
            >
              <Linkedin className="h-4 w-4 stroke-primary 
              group-hover:scale-110 group-hover:fill-primary  translate-all duration-300" />
            </a>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span>{speaker.role}</span>
          <span className="text-muted-foreground/50">at</span>
          <span className="flex items-center gap-1">
            <span className="text-xs">{companyLogos[speaker.company] || "🏢"}</span>
            <span>{speaker.company}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function SessionCard({ session }: { session: Session }) {
  if (session.isBreak) {
    return (
      <div className="flex gap-4">
        <div className="w-24 shrink-0 text-sm text-muted-foreground pt-1">
          <div>
            {session.startTime} - {session.endTime}
          </div>
        </div>
        <div className="flex-1 bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold text-foreground text-lg">{session.title}</h3>
          {session.sponsors && (
            <div className="mt-3">
              <p className="text-sm text-muted-foreground mb-2">Sponsors:</p>
              <div className="flex flex-wrap gap-3">
                {session.sponsors.map((sponsor) => (
                  <Badge key={sponsor} variant="secondary" className="bg-background/80 text-foreground">
                    {sponsor}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-4">
      <div className="w-24 shrink-0 text-sm text-muted-foreground pt-1">
        <div>
          {session.startTime} - {session.endTime}
        </div>
      </div>
      <div className="flex-1 border-l-2 border-primary/20 pl-4 pb-6">
        <h3 className="font-semibold text-foreground text-lg leading-tight">{session.title}</h3>
        {session.description && (
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{session.description}</p>
        )}

        {session.speakers?.map((speaker) => (
          <SpeakerCard key={speaker.name} speaker={speaker} />
        ))}

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1.5 rounded-md">
            <MapPin className="h-3.5 w-3.5" />
            <span>{session.room}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1.5 rounded-md">
            {formatIcons[session.format]}
            <span>{formatLabels[session.format]}</span>
          </div>
          {session.topic && <Badge className="bg-primary text-primary-foreground text-xs">{session.topic}</Badge>}
        </div>
      </div>
    </div>
  )
}

export function V0EventSchedule() {
  return (
    <div className="w-full h-full min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Wednesday</h1>
          <p className="text-lg text-muted-foreground mb-4">October 27, 2023</p>
          <Badge variant="outline" className="text-sm">
            <Globe className="h-3.5 w-3.5 mr-1.5" />
            Central Standard Time (GMT-6)
          </Badge>
        </div>

        {/* Schedule Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Morning Column */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Morning</h2>
            <div className="space-y-6">
              {morningSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </div>

          {/* Afternoon Column */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Afternoon</h2>
            <div className="space-y-6">
              {afternoonSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
