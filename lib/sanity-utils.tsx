import type { PortableTextBlock } from "sanity"
import { PortableText } from "@portabletext/react"
import Image from "next/image"

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

export function postPath(date: string, slug: string): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return `/blog/${slug}`
    const y = String(d.getFullYear())
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const dd = String(d.getDate()).padStart(2, "0")
    return `/${y}/${m}/${dd}/${slug}`
  } catch {
    return `/blog/${slug}`
  }
}

export const portableTextComponents = {
  block: {
    h2: ({ children }: any) => <h2 className="text-3xl font-serif font-bold mt-12 mb-6 text-primary">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-serif font-bold mt-8 mb-4 text-foreground">{children}</h3>,
    normal: ({ children }: any) => (
      <p className="text-muted-foreground leading-relaxed mb-6 text-lg md:text-xl">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 italic text-foreground my-8">{children}</blockquote>
    ),
  },
  types: {
    image: ({ value }: any) => {
      const { url, alt, width, height } = value || {}
      if (!url) return null
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={alt || ""}
            width={width || 1200}
            height={height || 800}
            className="rounded-md border-2 border-border"
            sizes="(max-width: 768px) 100vw, 768px"
            priority={false}
          />
          {alt && <figcaption className="text-sm text-muted-foreground mt-2">{alt}</figcaption>}
        </figure>
      )
    },
  },
  marks: {
    strong: ({ children }: any) => <strong className="text-foreground font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
}

export function renderPortableText(content: PortableTextBlock[]) {
  return <PortableText value={content} components={portableTextComponents} />
}
