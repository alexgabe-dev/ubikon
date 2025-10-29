"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { postPath } from "@/lib/sanity-utils"
import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

type Result = {
  _id: string
  title: string
  slug: string
  category?: string
  excerpt?: string
  date?: string
  readTime?: string
  coverUrl?: string
}

function highlight(text: string, q: string) {
  if (!q) return text
  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig")
  const parts = text.split(regex)
  return parts.map((p, i) =>
    regex.test(p) ? (
      <mark key={i} className="bg-primary/20 text-foreground">
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    ),
  )
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initial = (searchParams.get("q") || "").trim()
  const [q, setQ] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Result[]>([])
  const ctrlRef = useRef<AbortController | null>(null)

  // Debounced fetch
  useEffect(() => {
    const handler = setTimeout(async () => {
      const value = q.trim()
      const url = value ? `/api/search?q=${encodeURIComponent(value)}` : ""
      if (!url) {
        setResults([])
        router.replace(`/search${value ? `?q=${encodeURIComponent(value)}` : ""}`)
        return
      }
      setLoading(true)
      ctrlRef.current?.abort()
      ctrlRef.current = new AbortController()
      try {
        const res = await fetch(url, { signal: ctrlRef.current.signal })
        const data = await res.json()
        setResults(data)
        router.replace(`/search?q=${encodeURIComponent(value)}`)
      } catch (e) {
        // Ignore abort errors
      } finally {
        setLoading(false)
      }
    }, 250)
    return () => clearTimeout(handler)
  }, [q, router])

  const hasQuery = q.trim().length > 0

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold mb-4">Keresés</h1>

          <div className="flex items-center gap-2 mb-6">
            <input
              aria-label="Keresés"
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Keresés..."
              className="w-full bg-background border-2 border-border focus:border-primary px-4 py-3 text-sm outline-none transition-colors"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="px-3 py-2 border border-border hover:border-primary text-xs uppercase tracking-wide"
                aria-label="Törlés"
              >
                Törlés
              </button>
            )}
          </div>

          {!hasQuery && <p className="text-muted-foreground">Írj be valamit a kereséshez.</p>}
          {hasQuery && loading && <p className="text-muted-foreground">Keresés...</p>}
          {hasQuery && !loading && results.length === 0 && <p className="text-muted-foreground">Nincs találat.</p>}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((post) => (
              <Link key={post._id} href={postPath(post.date as string, post.slug)} className="group border-2 border-border hover:border-primary">
                <div className="relative overflow-hidden aspect-[4/3]">
                  {post.coverUrl && (
                    <Image src={post.coverUrl} alt={post.title} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 33vw" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-px bg-primary" />
                      {post.category && <span className="text-xs tracking-wider text-primary uppercase">{post.category}</span>}
                    </div>
                    <h3 className="text-xl font-serif font-bold">
                      {highlight(post.title, q)}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 text-muted-foreground line-clamp-2 font-serif">
                        {highlight(post.excerpt, q)}
                      </p>
                    )}
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