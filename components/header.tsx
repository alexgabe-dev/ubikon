"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const navigationItems = [
    { href: "/", label: "Főoldal" },
    { href: "/filmek", label: "Filmek", submenu: ["Sci-fi klasszikusok", "Újdonságok", "Cyberpunk", "Űropera"] },
    { href: "/konyvek", label: "Könyvek", submenu: ["Regények", "Novellák", "Filozófiai sci-fi"] },
    { href: "/sorozatok", label: "Sorozatok", submenu: ["Új megjelenések", "Ajánlók", "Retrospektív"] },
    { href: "/jatekok", label: "Játékok", submenu: ["PC", "VR", "Konzol sci-fi", "Indie"] },
    { href: "/velemenyek", label: "Vélemények" },
    { href: "/interjuk", label: "Interjúk" },
    { href: "/about", label: "Rólunk" },
    { href: "/kapcsolat", label: "Kapcsolat" }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-500/20 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-12 w-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-sm" />
              <div className="absolute inset-0 border-2 border-cyan-400 translate-x-1 translate-y-1 rounded-sm group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-wider text-white font-mono">UBIKON</span>
              <span className="text-xs text-cyan-400 tracking-widest">SCI-FI BLOG</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigationItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="text-sm font-medium tracking-wide text-gray-300 hover:text-cyan-400 transition-colors duration-300 uppercase relative"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800/95 backdrop-blur border border-cyan-500/20 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="p-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem}
                          href={`${item.href}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-3 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-700/50 rounded transition-colors"
                        >
                          {subItem}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Keresés..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-slate-800/50 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-900/98 backdrop-blur border-b border-cyan-500/20">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Keresés..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-slate-800/50 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
              
              {/* Mobile Menu Items */}
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem}
                            href={`${item.href}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block px-3 py-1 text-sm text-gray-400 hover:text-cyan-400 hover:bg-slate-800/30 rounded transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
