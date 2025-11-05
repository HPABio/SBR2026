import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-primary" />
            </div>
            <span className="font-bold text-lg">SynBio Reactor</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/gasb" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              GASB
            </Link>
            <Link href="/pitching" className="text-sm text-foreground font-medium">
              Pitching
            </Link>
            <Link
              href="/partner-program"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Partner Program
            </Link>
            <Link href="/sponsoring" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sponsoring
            </Link>
          </div>

          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary font-semibold">
            TICKETS
          </Button>
        </div>
      </div>
    </nav>
  )
}
