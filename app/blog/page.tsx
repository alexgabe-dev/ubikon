import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { client } from "@/sanity/client"
import { allPostsQuery } from "@/sanity/queries"
import { formatDate, postPath } from "@/lib/sanity-utils"

// Revalidate blog listing every 60 seconds
export const revalidate = 60

async function getAllPosts() {
  try {
    const posts = await client.fetch(allPostsQuery)
    return posts
  } catch (error) {
    console.error("[ubikon] Error fetching posts:", error)
    return []
  }
}

export default async function BlogPage() {
  const allPosts = await getAllPosts()

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
              <span className="text-xs tracking-[0.3em] text-primary uppercase">Sci-Fi & Tech Blog</span>
              <div className="h-px w-16 bg-primary" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-balance">Minden Cikk</h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Kritikák, elemzések és gondolatok a sci-fi univerzumról: könyvek, filmek, sorozatok, játékok és
              technológia
            </p>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 relative">
        <div className="absolute inset-0 concrete-texture opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          {allPosts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-serif font-bold mb-4">Még nincsenek cikkek</h2>
              <p className="text-muted-foreground mb-8">
                Látogass el a Sanity Studio-ba (/studio) és hozz létre új blog cikkeket!
              </p>
              <Link
                href="/studio"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground uppercase tracking-wide hover:bg-primary/90 transition-colors"
              >
                Sanity Studio Megnyitása
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map((post: any) => (
                <Link key={post._id} href={postPath(post.date, post.slug)}>
                  <Card className="group relative bg-card border-2 border-border hover:border-primary transition-all duration-300 overflow-hidden h-full">
                    {post.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="text-xs tracking-wider text-primary uppercase bg-background/80 px-3 py-1 border border-primary">
                          Kiemelt
                        </span>
                      </div>
                    )}

                    <div className="absolute top-0 right-0 w-16 h-16 border-l-2 border-b-2 border-primary/20 group-hover:border-primary transition-colors" />

                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-px bg-primary" />
                        <span className="text-xs tracking-wider text-primary uppercase">{post.category}</span>
                      </div>

                      <h3 className="text-2xl font-serif font-bold mb-4 text-card-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed mb-6 font-serif">{post.excerpt}</p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-wide">
                        <span>{formatDate(post.date)}</span>
                        <span>{post.readTime}</span>
                      </div>

                      <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm uppercase tracking-wide">Tovább Olvasom</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="square"
                          strokeLinejoin="miter"
                        >
                          <line x1="5" x2="19" y1="12" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
