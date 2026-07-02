"use client"

import type React from "react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Users, Presentation, MessageCircle, Wrench, Coffee, Star } from "lucide-react"
import scheduleData from "../data/swapcard_plannings.json"

type SessionFormat = "keynote" | "presentation" | "workshop" | "panel" | "discussion" | "networking" | "other"

interface RawSession {
  title: string
  beginsAt: string | null
  endsAt: string | null
  description: string | null
  metadata: string[]
  tags: string[]
  images: string[]
}

interface ParsedSession {
  id: string
  startTime: string
  endTime: string
  title: string
  description?: string
  room: string
  format: SessionFormat
  formatOriginal?: string
  tags: string[]
  speakers: string[]
  isBreak?: boolean
}

const formatIcons: Record<SessionFormat, React.ReactNode> = {
  keynote: <Presentation className="h-3.5 w-3.5" />,
  presentation: <Presentation className="h-3.5 w-3.5" />,
  workshop: <Wrench className="h-3.5 w-3.5" />,
  panel: <Users className="h-3.5 w-3.5" />,
  discussion: <MessageCircle className="h-3.5 w-3.5" />,
  networking: <Coffee className="h-3.5 w-3.5" />,
  other: <Star className="h-3.5 w-3.5" />,
}

function parseFormat(formatStr?: string): SessionFormat {
  if (!formatStr) return "other"
  const s = formatStr.toLowerCase()
  if (s.includes("keynote")) return "keynote"
  if (s.includes("panel")) return "panel"
  if (s.includes("workshop")) return "workshop"
  if (s.includes("discussion") || s.includes("chat")) return "discussion"
  if (s.includes("talk") || s.includes("presentation")) return "presentation"
  if (s.includes("networking") || s.includes("party") || s.includes("break")) return "networking"
  return "other"
}

function processData(dayData: RawSession[]): ParsedSession[] {
  return dayData.map((raw, idx) => {
    let room = "TBA"
    let formatStr = ""

    if (raw.metadata && raw.metadata.length > 0) {
      room = raw.metadata[0]
      if (raw.metadata.length > 1) {
        formatStr = raw.metadata[1]
      }
    }

    const isBreak = raw.title.toLowerCase().includes("break") || raw.title.toLowerCase().includes("afterparty") || raw.title.toLowerCase().includes("coffee")

    return {
      id: `session-${idx}`,
      startTime: raw.beginsAt || "TBA",
      endTime: raw.endsAt || "TBA",
      title: raw.title,
      description: raw.description || undefined,
      room,
      format: parseFormat(formatStr),
      formatOriginal: formatStr || (isBreak ? "Networking" : undefined),
      tags: raw.tags || [],
      speakers: raw.images || [],
      isBreak,
    }
  })
}

const parsedDay1 = processData(scheduleData.day1)
const parsedDay2 = processData(scheduleData.day2)

function SessionCard({ session }: { session: ParsedSession }) {
  if (session.isBreak) {
    return (
      <div className="flex gap-4">
        <div className="w-24 shrink-0 text-sm text-muted-foreground pt-1">
          <div>
            {session.startTime} - {session.endTime}
          </div>
        </div>
        <div className="flex-1 bg-muted/50 rounded-lg p-4 flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-full">
            <Coffee className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{session.title}</h3>
            {session.description && <p className="text-sm text-muted-foreground mt-1">{session.description}</p>}
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{session.room}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-4 group">
      {/* Time Column */}
      <div className="w-24 shrink-0 text-sm pt-1">
        <div className="font-medium text-foreground">{session.startTime}</div>
        <div className="text-muted-foreground">{session.endTime}</div>
      </div>

      {/* Content Column */}
      <div className="flex-1 pb-10 relative">
        {/* Timeline Line */}
        <div className="absolute left-[-2.5rem] top-2 bottom-[-2.5rem] w-px bg-border group-last:bg-transparent" />
        
        {/* Timeline Dot */}
        <div className="absolute left-[-2.75rem] top-2 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />

        <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm transition-all hover:shadow-md hover:border-border">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
            <div className="flex flex-wrap gap-2">
              {session.formatOriginal && (
                <Badge variant="secondary" className="flex items-center gap-1.5 bg-primary/10 text-primary hover:bg-primary/20 border-0">
                  {formatIcons[session.format]}
                  {session.formatOriginal}
                </Badge>
              )}
              {session.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-border text-muted-foreground">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
              <MapPin className="h-3.5 w-3.5" />
              <span>{session.room}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {session.title}
          </h3>
          
          {session.description && (
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              {session.description}
            </p>
          )}

          {session.speakers.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Speakers / Orgs</p>
              <div className="flex flex-wrap gap-4">
                {session.speakers.map((speaker, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                        {speaker.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{speaker}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function SBR2026Timetable() {
  const [activeDay, setActiveDay] = useState(1)
  
  const currentSessions = activeDay === 1 ? parsedDay1 : parsedDay2

  return (
    <div className="w-full max-w-4xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground font-anton uppercase tracking-tight">Agenda</h2>
          <p className="text-muted-foreground mt-1 font-quicksand">Explore the full program for SBR 2026</p>
        </div>
        
        <div className="flex bg-muted p-1 rounded-lg">
          <Button
            variant={activeDay === 1 ? "default" : "ghost"}
            className="rounded-md px-6"
            onClick={() => setActiveDay(1)}
          >
            Day 1
          </Button>
          <Button
            variant={activeDay === 2 ? "default" : "ghost"}
            className="rounded-md px-6"
            onClick={() => setActiveDay(2)}
          >
            Day 2
          </Button>
        </div>
      </div>

      <div className="space-y-2 pl-6">
        {currentSessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
        {currentSessions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No sessions scheduled for this day.
          </div>
        )}
      </div>
    </div>
  )
}

export default SBR2026Timetable
