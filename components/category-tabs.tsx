import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/client"
import { postsByCategoryQuery } from "@/sanity/queries"
import { postPath } from "@/lib/sanity-utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { WeatherWidget } from "@/components/weather"
import { SocialLinks } from "@/components/social-links"
import { Card } from "@/components/ui/card"
import { BackgroundDecor } from "@/components/background-decor"

export const revalidate = 60

type Post = {
  _id: string
  title: string
  slug: string
  category: string
  excerpt?: string
  date?: string
  coverUrl?: string
  coverWidth?: number
  coverHeight?: number
}

async function getByCategory(category: string) {
  try {
    const posts: Post[] = await client.fetch(postsByCategoryQuery, { category })
    return posts.slice(0, 2)
  } catch (e) {
    console.error("[ubikon] category tabs fetch error", category, e)
    return []
  }
}

export async function CategoryTabs() {
  const [film, sorozat, konyv, jatek] = await Promise.all([
    getByCategory("Film"),
    getByCategory("Sorozat"),
    getByCategory("Könyv"),
    getByCategory("Játék"),
  ])

  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      <BackgroundDecor patternOpacity="0.06" />
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-primary" />
            <h2 className="text-xs tracking-wider text-primary uppercase">Kategóriák</h2>
          </div>
        </div>

        <Tabs defaultValue="Film">
          <div className="mb-8">
            <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-4 lg:mb-6">
              Fedezd fel kategóriáink szerint
            </h3>
            <p className="text-muted-foreground lg:text-lg max-w-2xl">
              Válassz a kedvenc témáid közül és böngészd a legfrissebb tartalmakat.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7">
              <Card className="border-2 border-border rounded-lg overflow-hidden bg-muted/10 h-full">
                <div className="h-1 bg-primary" />
                <div className="p-5 lg:p-6">
              {/* Fülek bal oldalt, a kategória tartalom fölött */}
              <div className="mb-6">
                <TabsList>
                  <TabsTrigger value="Film">Filmek</TabsTrigger>
                  <TabsTrigger value="Sorozat">Sorozatok</TabsTrigger>
                  <TabsTrigger value="Könyv">Könyvek</TabsTrigger>
                  <TabsTrigger value="Játék">Játékok</TabsTrigger>
                </TabsList>
              </div>
              {([
                { key: "Film", items: film, link: "/filmek" },
                { key: "Sorozat", items: sorozat, link: "/sorozatok" },
                { key: "Könyv", items: konyv, link: "/konyvek" },
                { key: "Játék", items: jatek, link: "/jatekok" },
          ] as const).map(({ key, items, link }) => (
                <TabsContent key={key} value={key} className="mt-0">
                  {items.length === 0 ? (
                    <div className="border-2 border-border p-6 text-center rounded-lg">
                      <p className="text-xs text-muted-foreground">Ebben a kategóriában még nincs bejegyzés.</p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6">
                      {items.map((post) => (
                        <Link key={post._id} href={postPath(post.date as string, post.slug)} className="group border-2 border-border hover:border-primary transition-colors rounded-lg overflow-hidden">
                          <div className="relative overflow-hidden aspect-[4/3]">
                            {post.coverUrl ? (
                              <Image
                                src={post.coverUrl}
                                alt={post.title}
                                fill
                                className="object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 flex justify-center lg:justify-start">
                    <Link href={link} className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground uppercase tracking-wide border border-primary hover:bg-primary/90 transition-colors rounded-lg">
                      Tovább a kategóriára
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </TabsContent>
              ))}
                </div>
              </Card>
            </div>
            <div className="lg:col-span-3">
              <WeatherWidget className="h-full" />
            </div>
            <div className="lg:col-span-2">
              <SocialLinks className="h-full" />
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  )
}