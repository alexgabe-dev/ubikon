import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/client"
import { allPostsQuery } from "@/sanity/queries"
import { postPath } from "@/lib/sanity-utils"

type Post = {
  _id: string
  title: string
  slug: string
  category: string
  excerpt?: string
  date?: string
  readTime?: string
  coverUrl?: string
}

export const revalidate = 60

export async function LatestGrid() {
  let posts: Post[] = []
  try {
    posts = await client.fetch(allPostsQuery)
  } catch (e) {
    console.error("[ubikon] latest-grid fetch error", e)
    posts = []
  }
  const list = posts.slice(0, 12)
  const cats = Array.from(new Set(list.map((p) => p.category))).filter(Boolean)

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <h2 className="text-xs tracking-wider text-primary uppercase">Legfrissebb Tartalmak</h2>
          </div>

          {/* Top címkék/temák chips sor */}
          <div className="flex flex-wrap gap-2 lg:gap-3">
            <Link href="/blog" className="text-xs uppercase tracking-wide border px-3 py-2 border-primary text-primary bg-primary/5 hover:bg-primary hover:text-primary-foreground transition-colors rounded-full">
              Összes
            </Link>
            {cats.map((c) => (
              <Link key={c} href={`/${c.toLowerCase()}${c === 'Könyv' ? 'ek' : c === 'Sorozat' ? 'ok' : c === 'Játék' ? 'ok' : 'ek'}`}
                className="text-xs uppercase tracking-wide border px-3 py-2 border-border hover:border-primary hover:bg-primary/5 transition-colors rounded-full">
                {c}
              </Link>
            ))}
          </div>
        </div>

        {/* Posztok rács */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {list.map((post) => (
            <Link key={post._id} href={postPath(post.date as string, post.slug)} className="group">
              <div className="border-2 border-border hover:border-primary transition-colors rounded-lg overflow-hidden">
                {/* Overlay kártya */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  {post.coverUrl ? (
                    <Image
                      src={post.coverUrl}
                      alt={post.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted/20" />
                  )}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                    <span className="inline-block mb-2 text-[10px] tracking-wider uppercase bg-primary text-primary-foreground px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <h3 className="text-sm lg:text-base font-serif font-bold text-white line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Gyors linkek a kategória oldalakra */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            <Link href="/filmek" className="inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Több Film
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/sorozatok" className="inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Több Sorozat
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/konyvek" className="inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Több Könyv
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/jatekok" className="inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Több Játék
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}