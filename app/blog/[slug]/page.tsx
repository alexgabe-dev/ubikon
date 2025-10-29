import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { client } from "@/sanity/client"
import { postBySlugQuery } from "@/sanity/queries"
import { formatDate, renderPortableText } from "@/lib/sanity-utils"
import { notFound } from "next/navigation"

async function getPost(slug: string) {
  try {
    const post = await client.fetch(postBySlugQuery, { slug })
    return post
  } catch (error) {
    console.error("[v0] Error fetching post:", error)
    return null
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Article header */}
      <article className="relative pt-32 pb-20">
        <div className="absolute inset-0 concrete-texture opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Category */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="text-xs tracking-wider text-primary uppercase">{post.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 text-balance">{post.title}</h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-12 pb-12 border-b-2 border-border">
              <div className="flex items-center gap-2">
                <span className="uppercase tracking-wide">Szerző:</span>
                <span className="text-foreground">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="uppercase tracking-wide">Dátum:</span>
                <span className="text-foreground">{formatDate(post.date)}</span>
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wide">Olvasási idő:</span>
                  <span className="text-foreground">{post.readTime}</span>
                </div>
              )}
            </div>

            <div className="prose prose-lg prose-invert max-w-none">{renderPortableText(post.content)}</div>

            {/* Share section */}
            <div className="mt-16 pt-12 border-t-2 border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-wide text-muted-foreground">Megosztás:</span>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" className="uppercase tracking-wide bg-transparent">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="uppercase tracking-wide bg-transparent">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="uppercase tracking-wide bg-transparent">
                    Másolás
                  </Button>
                </div>
              </div>
            </div>

            {/* Back to blog */}
            <div className="mt-12">
              <Link href="/blog">
                <Button variant="outline" className="uppercase tracking-wide bg-transparent">
                  ← Vissza a bloghoz
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
