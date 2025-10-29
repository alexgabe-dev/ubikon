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
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const [showNew, setShowNew] = useState(true)
  const count = items?.length || 0
  const indexRef = useState(0)[0] as any

  // Auto-advance with smooth crossfade
  useEffect(() => {
    if (count <= 1) return
    let id: any
    id = setInterval(() => {
      setPrevIndex((curr) => (curr === null ? index : index))
      const next = (index + 1) % count
      setIndex(next)
      setTransitioning(true)
      setShowNew(false)
      // allow new slide to fade in
      setTimeout(() => setShowNew(true), 20)
      // end transition
      setTimeout(() => {
        setTransitioning(false)
        setPrevIndex(null)
      }, 700)
    }, interval)
    return () => clearInterval(id)
  }, [count, interval, index])

  if (!items || items.length === 0) return null
  const current = items[index]

  return (
    <Link
      href={require("@/lib/sanity-utils").postPath(current.date as string, current.slug)}
      className="group block cursor-pointer"
      aria-label={current.title}
    >
      {/* Fixed aspect ratio on mobile to prevent layout jumps */}
      <div className="relative border-2 border-border overflow-hidden aspect-[4/3] sm:aspect-[4/3] md:aspect-[16/9]">
        {/* Previous slide (fades out) */}
        {prevIndex !== null && transitioning && (
          <div className="absolute inset-0 transition-opacity duration-700 opacity-0">
            {items[prevIndex]?.coverUrl && (
              <Image
                src={items[prevIndex].coverUrl as string}
                alt={items[prevIndex].title}
                fill
                className="object-cover object-top sm:object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1024px"
                priority
              />
            )}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <span className="block mb-2 text-xs tracking-wider text-primary uppercase bg-background/80 px-2 py-1 border border-primary w-fit">
                Kiemelt
              </span>
              <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-foreground underline-sweep inline">
                {items[prevIndex].title}
              </h1>
            </div>
          </div>
        )}
        {/* Current slide (fades in) */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${showNew ? "opacity-100" : "opacity-0"}`}>
          {current.coverUrl && (
            <Image
              src={current.coverUrl}
              alt={current.title}
              fill
              className="object-cover object-top sm:object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1024px"
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
        {/* Make whole card clickable; avoid nested interactive elements */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <span className="block mb-2 text-xs tracking-wider text-primary uppercase bg-background/80 px-2 py-1 border border-primary w-fit">
            Kiemelt
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-foreground underline-sweep inline">
            {current.title}
          </h1>
          {current.excerpt && (
            <p className="mt-4 max-w-2xl text-foreground hidden md:block md:text-lg drop-shadow-md">
              {current.excerpt}
            </p>
          )}
          <div className="mt-6">
            <span className="px-4 py-2 bg-primary text-primary-foreground uppercase tracking-wide border border-primary shadow-md inline-block pointer-events-none">
              Olvasd el
            </span>
          </div>
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