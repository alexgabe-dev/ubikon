import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Rólunk",
  description: "Az Ubikon küldetése és filozófiája.",
  alternates: { canonical: `${siteUrl}/about` },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 concrete-texture opacity-50" />
        <div className="absolute inset-0 art-deco-pattern opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-primary" />
              <span className="text-xs tracking-[0.3em] text-primary uppercase">Rólunk</span>
              <div className="h-px w-16 bg-primary" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-balance">
              Az Ubikon Küldetése
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-serif">
              Felfedezve a jövő határait a sci-fi, technológia és kultúra metszéspontjában
            </p>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 concrete-texture opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Mission */}
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-px bg-primary" />
                <h2 className="text-xs tracking-wider text-primary uppercase">Küldetésünk</h2>
              </div>

              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-primary">Miért létezik az Ubikon?</h3>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Az Ubikon egy brutális-art deco fúzió, amely a science fiction, a technológia és a popkultúra világát
                  kutatja. Célunk, hogy olyan tartalmakat hozzunk létre, amelyek inspirálnak, gondolkodásra késztetnek
                  és felfedezik a jövő lehetőségeit.
                </p>

                <p>
                  Hiszünk abban, hogy a sci-fi nem csak szórakozás - ez egy eszköz, amellyel megérthetjük a jelent és
                  elképzelhetjük a jövőt. Minden történet, minden elemzés, minden cikk egy ablak a lehetséges világokba.
                </p>
              </div>
            </div>

            {/* What we cover */}
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-px bg-primary" />
                <h2 className="text-xs tracking-wider text-primary uppercase">Mit Fedünk Le</h2>
              </div>

              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-primary">Témáink</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="border-2 border-border p-6 relative group hover:border-primary transition-colors">
                  <div className="absolute top-0 right-0 w-12 h-12 border-l-2 border-b-2 border-primary/20 group-hover:border-primary transition-colors" />
                  <h4 className="text-xl font-serif font-bold mb-3 text-foreground">Sci-Fi Irodalom</h4>
                  <p className="text-muted-foreground leading-relaxed font-serif">
                    Könyvkritikák, elemzések és felfedezések a science fiction irodalom világából.
                  </p>
                </div>

                <div className="border-2 border-border p-6 relative group hover:border-primary transition-colors">
                  <div className="absolute top-0 right-0 w-12 h-12 border-l-2 border-b-2 border-primary/20 group-hover:border-primary transition-colors" />
                  <h4 className="text-xl font-serif font-bold mb-3 text-foreground">Filmek & Sorozatok</h4>
                  <p className="text-muted-foreground leading-relaxed font-serif">
                    Elemzések, kritikák és háttértörténetek a sci-fi filmek és sorozatok világából.
                  </p>
                </div>

                <div className="border-2 border-border p-6 relative group hover:border-primary transition-colors">
                  <div className="absolute top-0 right-0 w-12 h-12 border-l-2 border-b-2 border-primary/20 group-hover:border-primary transition-colors" />
                  <h4 className="text-xl font-serif font-bold mb-3 text-foreground">Technológia</h4>
                  <p className="text-muted-foreground leading-relaxed font-serif">
                    A legújabb technológiai fejlesztések és azok hatása a jövőnkre.
                  </p>
                </div>

                <div className="border-2 border-border p-6 relative group hover:border-primary transition-colors">
                  <div className="absolute top-0 right-0 w-12 h-12 border-l-2 border-b-2 border-primary/20 group-hover:border-primary transition-colors" />
                  <h4 className="text-xl font-serif font-bold mb-3 text-foreground">Játékok</h4>
                  <p className="text-muted-foreground leading-relaxed font-serif">
                    Sci-fi videojátékok, társasjátékok és interaktív élmények felfedezése.
                  </p>
                </div>
              </div>
            </div>

            {/* Philosophy */}
            <div className="border-2 border-primary p-8 md:p-12 relative">
              <div className="absolute top-0 left-0 w-16 h-16 border-r-2 border-b-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-l-2 border-t-2 border-primary" />

              <blockquote className="text-2xl md:text-3xl font-serif font-bold text-center text-primary italic">
                "A jövő nem jön magától. Mi építjük, egy történet, egy ötlet, egy felfedezés egyszerre."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
