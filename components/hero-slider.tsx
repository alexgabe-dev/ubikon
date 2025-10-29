"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type Item = {
  _id: string
  title: string
  slug: string
  date?: string
  excerpt?: string
  coverUrl?: string
  coverWidth?: number
  coverHeight?: number
  category?: string
}

export function HeroSlider({ items, interval = 5000 }: { items: Item[]; interval?: number }) {
  const [index, setIndex] = useState(0)
  const count = items?.length || 0

  useEffect(() => {
    if (count <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval)
    return () => clearInterval(id)
  }, [count, interval])

  if (!items || items.length === 0) return null
  const current = items[index]

  return (
    <Link href={require("@/lib/sanity-utils").postPath(current.date as string, current.slug)} className="group block">
      <div className="relative border-2 border-border overflow-hidden">
        {current.coverUrl && (
          <Image
            src={current.coverUrl}
            alt={current.title}
            width={current.coverWidth || 1600}
            height={current.coverHeight || 900}
            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        )}
        {/* Stronger readability overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Bottom-to-top dark gradient to improve text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent" />
          {/* Subtle left-to-right shade to soften bright areas behind text */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <span className="block mb-2 text-xs tracking-wider text-primary uppercase bg-background/80 px-2 py-1 border border-primary w-fit">
            Kiemelt
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-sans font-extrabold leading-tight text-foreground underline-sweep inline">
            {current.title}
          </h1>
          {current.excerpt && (
            <p className="mt-4 max-w-2xl text-foreground hidden md:block md:text-lg drop-shadow-md">
              {current.excerpt}
            </p>
          )}
          <div className="mt-6">
            <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-wide border border-primary shadow-md">
              Olvasd el
            </button>
          </div>
        </div>

        {/* Simple dots */}
        {count > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            {items.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 border border-primary ${i === index ? "bg-primary" : "bg-background/60"}`}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}