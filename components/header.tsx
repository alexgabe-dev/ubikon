"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function Header() {
  const [query, setQuery] = useState("")
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
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="nav-link">Főoldal</Link>
            <Link href="/blog" className="nav-link">Blog</Link>
            <Link href="/about" className="nav-link">Rólam</Link>
            <Link href="/archive" className="nav-link">Archívum</Link>
            {/* Search */}
            <form action="/search" className="relative ml-4">
              <input
                type="text"
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Keresés..."
                className="h-9 w-48 bg-background border border-border px-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </form>
          </nav>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="flex flex-col gap-4 mt-4">
                <Link href="/" className="nav-link">Főoldal</Link>
                <Link href="/blog" className="nav-link">Blog</Link>
                <Link href="/about" className="nav-link">Rólam</Link>
                <Link href="/archive" className="nav-link">Archívum</Link>
              </nav>
              <form action="/search" className="mt-6">
                <input
                  type="text"
                  name="q"
                  placeholder="Keresés..."
                  className="w-full h-10 bg-background border border-border px-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                />
                <Button type="submit" className="mt-2 w-full uppercase tracking-wide">Keresés</Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
