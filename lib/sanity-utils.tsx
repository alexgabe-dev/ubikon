import type { PortableTextBlock } from "sanity"
import { PortableText } from "@portabletext/react"

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

export const portableTextComponents = {
  block: {
    h2: ({ children }: any) => <h2 className="text-3xl font-serif font-bold mt-12 mb-6 text-primary">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-serif font-bold mt-8 mb-4 text-foreground">{children}</h3>,
    normal: ({ children }: any) => <p className="text-muted-foreground leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 italic text-foreground my-8">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="text-foreground font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
}

export function renderPortableText(content: PortableTextBlock[]) {
  return <PortableText value={content} components={portableTextComponents} />
}
