import { Card } from "@/components/ui/card"
import Link from "next/link"
import { client } from "@/sanity/client"
import { featuredPostsQuery } from "@/sanity/queries"
import { formatDate, postPath } from "@/lib/sanity-utils"

async function getFeaturedPosts() {
  try {
    const posts = await client.fetch(featuredPostsQuery)
    return posts
  } catch (error) {
    console.error("[ubikon] Error fetching featured posts:", error)
    return []
  }
}

export async function FeaturedPosts() {
  const posts = await getFeaturedPosts()

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 concrete-texture opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-xs tracking-[0.3em] text-primary uppercase">Kiemelt Cikkek</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-center text-balance">Legújabb Bejegyzések</h3>
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link key={post._id} href={postPath(post.date, post.slug)}>
              <Card className="group relative bg-card border-2 border-border hover:border-primary transition-all duration-300 overflow-hidden h-full">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 border-l-2 border-b-2 border-primary/20 group-hover:border-primary transition-colors" />

                <div className="p-8">
                  {/* Category */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-px bg-primary" />
                    <span className="text-xs tracking-wider text-primary uppercase">{post.category}</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-2xl font-serif font-bold mb-4 text-card-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-wide">
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Hover indicator */}
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
      </div>
    </section>
  )
}
