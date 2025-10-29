import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Archívum",
  description: "Az Ubikon történetek időrendi archívuma.",
  alternates: { canonical: `${siteUrl}/archive` },
}

const archiveByMonth = [
  {
    month: "2025 Január",
    stories: [
      { slug: "neon-almok-digitalis-esoben", title: "Neon Álmok Digitális Esőben", date: "2025.01.15" },
      { slug: "az-utolso-koloniahajo", title: "Az Utolsó Kolóniahajó", date: "2025.01.10" },
      { slug: "amikor-a-gepek-almodnak", title: "Amikor a Gépek Álmodnak", date: "2025.01.05" },
    ],
  },
  {
    month: "2024 December",
    stories: [
      { slug: "kvantum-arnyak", title: "Kvantum Árnyak", date: "2024.12.28" },
      { slug: "a-mars-kronikak", title: "A Mars Krónikák", date: "2024.12.20" },
      { slug: "szingularitas-elott", title: "Szingularitás Előtt", date: "2024.12.15" },
    ],
  },
]

const categories = [
  { name: "Cyberpunk", count: 5 },
  { name: "Űropera", count: 8 },
  { name: "MI Etika", count: 6 },
  { name: "Hard Sci-Fi", count: 4 },
  { name: "Posztapokalipszis", count: 3 },
]

export default function ArchivePage() {
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
              <span className="text-xs tracking-[0.3em] text-primary uppercase">Archívum</span>
              <div className="h-px w-16 bg-primary" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-balance">
              Történetek Archívuma
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Böngészd át az összes megjelent történetet időrend vagy kategória szerint
            </p>
          </div>
        </div>
      </section>

      {/* Archive content */}
      <section className="py-20 relative">
        <div className="absolute inset-0 concrete-texture opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Timeline */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-12 h-px bg-primary" />
                  <h2 className="text-xs tracking-wider text-primary uppercase">Időrendi Sorrend</h2>
                </div>

                <div className="space-y-12">
                  {archiveByMonth.map((monthData, index) => (
                    <div key={index}>
                      <h3 className="text-2xl font-serif font-bold mb-6 text-primary">{monthData.month}</h3>

                      <div className="space-y-4">
                        {monthData.stories.map((story, storyIndex) => (
                          <Link key={storyIndex} href={`/stories/${story.slug}`}>
                            <div className="group border-l-2 border-border hover:border-primary pl-6 py-3 transition-all">
                              <div className="flex items-start justify-between gap-4">
                                <h4 className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                                  {story.title}
                                </h4>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                                  {story.date}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div>
                {/* Categories */}
                <div className="border-2 border-border p-6 mb-8 relative">
                  <div className="absolute top-0 right-0 w-12 h-12 border-l-2 border-b-2 border-primary/20" />

                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-px bg-primary" />
                    <h3 className="text-xs tracking-wider text-primary uppercase">Kategóriák</h3>
                  </div>

                  <ul className="space-y-3">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="flex items-center justify-between group hover:text-primary transition-colors"
                        >
                          <span className="text-sm uppercase tracking-wide">{category.name}</span>
                          <span className="text-xs text-muted-foreground group-hover:text-primary">
                            ({category.count})
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Search */}
                <div className="border-2 border-border p-6 relative">
                  <div className="absolute top-0 right-0 w-12 h-12 border-l-2 border-b-2 border-primary/20" />

                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-px bg-primary" />
                    <h3 className="text-xs tracking-wider text-primary uppercase">Keresés</h3>
                  </div>

                  <input
                    type="text"
                    placeholder="KERESÉS..."
                    className="w-full bg-background border-2 border-border focus:border-primary px-4 py-3 uppercase tracking-wide text-sm placeholder:text-muted-foreground/50 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
