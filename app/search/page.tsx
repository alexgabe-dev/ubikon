import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/client"
import { allPostsQuery } from "@/sanity/queries"
import { postPath } from "@/lib/sanity-utils"

export const revalidate = 60

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q || "").trim()
  const posts = await client.fetch(allPostsQuery)
  const results = q
    ? posts.filter((p: any) =>
        [p.title, p.excerpt, p.category].some((t: string) => t?.toLowerCase().includes(q.toLowerCase())),
      )
    : []

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold mb-6">Keresés</h1>
          <p className="text-muted-foreground mb-8">Keresési kifejezés: {q || ""}</p>

          {q && results.length === 0 && <p className="text-muted-foreground">Nincs találat.</p>}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((post: any) => (
              <Link key={post._id} href={postPath(post.date, post.slug)} className="group border-2 border-border hover:border-primary">
                <div className="grid grid-cols-3">
                  <div className="col-span-1">
                    {post.coverUrl && (
                      <Image
                        src={post.coverUrl}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4 col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-px bg-primary" />
                      <span className="text-xs tracking-wider text-primary uppercase">{post.category}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold underline-sweep inline">{post.title}</h3>
                    <p className="mt-2 text-muted-foreground line-clamp-3 font-serif">{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}