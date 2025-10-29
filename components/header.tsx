import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="h-12 w-12 bg-primary" />
              <div className="absolute inset-0 border-2 border-primary translate-x-1 translate-y-1" />
            </div>
            <span className="text-2xl font-bold tracking-wider text-foreground font-sans">UBIKON</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/blog"
              className="text-sm font-medium tracking-wide text-muted-foreground hover:text-primary transition-colors uppercase"
            >
              Blog
            </Link>
            <Link
              href="/archive"
              className="text-sm font-medium tracking-wide text-muted-foreground hover:text-primary transition-colors uppercase"
            >
              Archívum
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium tracking-wide text-muted-foreground hover:text-primary transition-colors uppercase"
            >
              Rólunk
            </Link>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-wide bg-transparent"
            >
              Kapcsolat
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  )
}
