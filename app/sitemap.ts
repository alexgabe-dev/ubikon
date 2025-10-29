import type { MetadataRoute } from "next"
import { client } from "@/sanity/client"
import { allPostsQuery } from "@/sanity/queries"
import { postPath } from "@/lib/sanity-utils"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

type Post = {
  slug: string
  date?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: any[] = []
  try {
    posts = await client.fetch(allPostsQuery)
  } catch (e) {
    posts = []
  }

  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/archive`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/search`, lastModified: now, changeFrequency: "daily", priority: 0.4 },
    { url: `${siteUrl}/filmek`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${siteUrl}/sorozatok`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${siteUrl}/konyvek`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${siteUrl}/jatekok`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
  ]

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => {
    const url = `${siteUrl}${postPath(p.date as string, p.slug)}`
    return {
      url,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: "weekly",
      priority: 0.9,
    }
  })

  return [...staticPages, ...postEntries]
}