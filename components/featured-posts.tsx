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
    <section className="py-12 lg:py-20 relative">
      <div className="absolute inset-0 concrete-texture opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-xs tracking-[0.3em] text-primary uppercase">Szerkesztői Ajánló</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h3 className="text-3xl lg:text-4xl font-serif font-bold text-center text-balance">Kiemelt Tartalmak</h3>
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post: any) => (
            <Link key={post._id} href={postPath(post.date, post.slug)}>
              <Card className="group relative border-2 border-border hover:border-primary transition-all duration-300 overflow-hidden h-full rounded-lg">
                {/* Mobile overlay card */}
                <div className="md:hidden relative overflow-hidden aspect-[4/3]">
                  {post.coverUrl ? (
                    <img src={post.coverUrl} alt={post.title} className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="absolute inset-0 bg-muted/20" />
                  )}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block mb-2 text-[10px] tracking-wider uppercase bg-primary text-primary-foreground px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <h4 className="text-lg font-serif font-bold text-white line-clamp-2 mb-2">
                      {post.title}
                    </h4>
                    {post.excerpt && (
                      <p className="text-sm text-white/80 line-clamp-2">{post.excerpt}</p>
                    )}
                  </div>
                </div>

                {/* Desktop text card */}
                <div className="hidden md:block p-6 lg:p-8 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs tracking-wider uppercase text-primary bg-primary/10 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(post.date)}
                    </span>
                  </div>

                  <h4 className="text-xl lg:text-2xl font-serif font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>

                  {post.excerpt && (
                    <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      {post.readTime || "5"} perc olvasás
                    </span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform">
                      →
                    </span>
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
