"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PitchForm() {
  const [formData, setFormData] = useState({
    startupName: "",
    founderName: "",
    email: "",
    phone: "",
    website: "",
    pitch: "",
    stage: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    // Handle form submission
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-balance">Apply to Pitch</CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill out the form below to apply for a pitching slot at SynBio Reactor Summit 2026
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startupName">Startup Name *</Label>
              <Input
                id="startupName"
                placeholder="Your Company Name"
                value={formData.startupName}
                onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                required
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="founderName">Founder Name *</Label>
              <Input
                id="founderName"
                placeholder="Your Full Name"
                value={formData.founderName}
                onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                required
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="founder@startup.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+49 123 456 7890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website / LinkedIn</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://yourcompany.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stage">Company Stage *</Label>
            <Input
              id="stage"
              placeholder="e.g., Pre-seed, Seed, Series A"
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              required
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pitch">Elevator Pitch (max 500 characters) *</Label>
            <Textarea
              id="pitch"
              placeholder="Describe your synthetic biology innovation and its impact..."
              value={formData.pitch}
              onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
              required
              maxLength={500}
              rows={6}
              className="bg-background border-border resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">{formData.pitch.length}/500 characters</p>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
