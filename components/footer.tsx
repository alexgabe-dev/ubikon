export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="h-10 w-10 bg-primary" />
                <div className="absolute inset-0 border-2 border-primary translate-x-1 translate-y-1" />
              </div>
              <span className="text-xl font-bold tracking-wider text-foreground">UBIKON</span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Brutális-art deco fúzió, amely a sci-fi, a technológia és az emberi állapot határait kutatja a holnap
              világaiban.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-primary">Felfedezés</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/stories"
                  className="text-muted-foreground hover:text-primary transition-colors uppercase text-xs tracking-wide"
                >
                  Történetek
                </a>
              </li>
              <li>
                <a
                  href="/archive"
                  className="text-muted-foreground hover:text-primary transition-colors uppercase text-xs tracking-wide"
                >
                  Archívum
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors uppercase text-xs tracking-wide"
                >
                  Rólunk
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors uppercase text-xs tracking-wide"
                >
                  Kapcsolat
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-primary">Kapcsolódás</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors uppercase text-xs tracking-wide"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors uppercase text-xs tracking-wide"
                >
                  Mastodon
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors uppercase text-xs tracking-wide"
                >
                  RSS Hírfolyam
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              © 2025 Ubikon.hu — Minden jog fenntartva
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
              >
                Adatvédelem
              </a>
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
              >
                Feltételek
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
