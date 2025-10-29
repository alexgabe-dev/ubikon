import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/client"
import { postsByCategoryQuery } from "@/sanity/queries"
import { formatDate, postPath } from "@/lib/sanity-utils"
import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Filmek",
  description: "Sci-fi filmek kritikái és elemzései.",
  alternates: { canonical: `${siteUrl}/filmek` },
}

export const revalidate = 60

export default async function FilmekPage() {
  const posts = await client.fetch(postsByCategoryQuery, { category: "Film" })
  return (
    <main className="min-h-screen">
      <Header />
      <section className="relative pt-28 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold mb-6">Filmek</h1>
          <p className="text-muted-foreground mb-8">Sci-fi filmek kritikái és elemzései.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link key={post._id} href={postPath(post.date, post.slug)} className="group border-2 border-border hover:border-primary">
                <div className="relative aspect-[16/9] bg-muted/20 overflow-hidden">
                  {post.coverUrl && (
                    <Image src={post.coverUrl} alt={post.title} width={800} height={450} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-px bg-primary" />
                    <span className="text-xs tracking-wider text-primary uppercase">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold underline-sweep inline">{post.title}</h3>
                  <p className="mt-2 text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <div className="mt-3 text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-4">
                    <span>{formatDate(post.date)}</span>
                    {post.readTime && <span>{post.readTime}</span>}
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