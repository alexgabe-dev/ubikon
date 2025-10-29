import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/client"
import { allPostsQuery, featuredPostsQuery } from "@/sanity/queries"
import { formatDate, postPath } from "@/lib/sanity-utils"
import { HeroSlider } from "@/components/hero-slider"

// Revalidate homepage every 60 seconds to reflect new posts
export const revalidate = 60

async function getHomeData() {
  try {
    const [featured, posts] = await Promise.all([
      client.fetch(featuredPostsQuery),
      client.fetch(allPostsQuery),
    ])
    return { featured, posts }
  } catch (e) {
    console.error("[ubikon] Home data fetch error:", e)
    return { featured: [], posts: [] }
  }
}

export default async function Home() {
  const { featured, posts } = await getHomeData()

  const categories = Array.from(new Set(posts.map((p: any) => p.category))).slice(0, 8)
  const latest = posts.slice(0, 5)

  return (
    <main className="min-h-screen">
      <Header />

      {/* Featured hero slider */}
      <section className="relative pt-28 pb-12">
        <div className="container mx-auto px-4">
          {featured.length > 0 ? (
            <HeroSlider items={featured} />
          ) : (
            <div className="border-2 border-border p-8 text-center">
              <h2 className="text-2xl font-serif font-bold mb-2">Üdv az Ubikon blogon</h2>
              <p className="text-muted-foreground">Hozz létre cikkeket a Studio-ban, hogy megjelenjenek itt.</p>
            </div>
          )}
        </div>
      </section>

      {/* Main feed + sidebar */}
      <section className="py-8">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
          {/* Feed */}
          <div className="lg:col-span-2 space-y-8">
            {posts.slice(0, 12).map((post: any) => (
              <article key={post._id} className="group border-2 border-border hover:border-primary transition-colors">
                {/* Mobile overlay card */}
                <Link href={postPath(post.date, post.slug)} className="md:hidden block">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    {post.coverUrl ? (
                      <Image
                        src={post.coverUrl}
                        alt={post.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw"
                        priority={false}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Nincs kép</span>
                      </div>
                    )}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {post.category && (
                        <span className="inline-block mb-2 text-xs tracking-wider uppercase bg-primary text-primary-foreground px-2 py-1">
                          {post.category}
                        </span>
                      )}
                      <h3 className="text-xl sm:text-2xl font-serif font-bold leading-snug text-foreground">
                        {post.title}
                      </h3>
                      <div className="mt-3 text-[11px] text-muted-foreground uppercase tracking-wide flex items-center gap-4">
                        <span>{formatDate(post.date)}</span>
                        {post.readTime && <span>{post.readTime}</span>}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Desktop/tablet grid card */}
                <div className="hidden md:grid md:grid-cols-3 gap-0">
                  <div className="md:col-span-1">
                    {post.coverUrl ? (
                      <Image
                        src={post.coverUrl}
                        alt={post.title}
                        width={post.coverWidth || 800}
                        height={post.coverHeight || 600}
                        className="w-full h-full object-cover"
                        sizes="(max-width: 1024px) 33vw, 33vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted/20 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Nincs kép</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-px bg-primary" />
                      <span className="text-xs tracking-wider text-primary uppercase">{post.category}</span>
                    </div>
                    <Link href={postPath(post.date, post.slug)} className="block">
                      <h3 className="text-2xl font-serif font-bold underline-sweep inline">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{post.excerpt}</p>
                    <div className="mt-4 text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-4">
                      <span>{formatDate(post.date)}</span>
                      {post.readTime && <span>{post.readTime}</span>}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="border-2 border-border p-6">
              <h3 className="text-xs tracking-wider text-primary uppercase mb-4">Legfrissebb hírek</h3>
              <ul className="space-y-4">
                {latest.map((p: any) => (
                  <li key={p._id}>
                    <Link href={postPath(p.date, p.slug)} className="group">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 border border-border bg-muted/20 overflow-hidden">
                          {p.coverUrl && (
                            <Image
                              src={p.coverUrl}
                              alt={p.title}
                              width={64}
                              height={64}
                              className="w-16 h-16 object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2">
                            {p.title}
                          </h4>
                          <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                            {formatDate(p.date)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-border p-6">
              <h3 className="text-xs tracking-wider text-primary uppercase mb-4">Kategóriák</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <span key={c} className="text-xs uppercase tracking-wide border px-2 py-1 border-border">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  )
}
