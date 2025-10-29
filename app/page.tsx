import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/client"
import { allPostsQuery, featuredPostsQuery } from "@/sanity/queries"
import { formatDate, postPath } from "@/lib/sanity-utils"
import { HeroSlider } from "@/components/hero-slider"
import { Newsletter } from "@/components/newsletter"
import { CategoryTabs } from "@/components/category-tabs"
import { FeaturedPosts } from "@/components/featured-posts"
import { LatestGrid } from "@/components/latest-grid"
import { BackgroundDecor } from "@/components/background-decor"

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
      <section className="relative pt-28 pb-12 overflow-hidden">
        {/* Diszkrét háttérdekor a herohoz */}
        <BackgroundDecor patternOpacity="0.08" />
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

      {/* Kategória‑fülek: Filmek / Sorozatok / Könyvek / Játékok */}
      <CategoryTabs />

      {/* Szerkesztői ajánló */}
      <FeaturedPosts />

      {/* Legfrissebb posztok rács */}
      <LatestGrid />

      {/* Hírlevél blokk a footer fölött */}
      <Newsletter />

      <Footer />
    </main>
  )
}
