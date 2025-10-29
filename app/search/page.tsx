import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import type { Metadata } from "next"
import { SearchContent } from "./SearchContent"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Keresés",
  description: "Keresés az Ubikon sci‑fi cikkei között.",
  alternates: { canonical: `${siteUrl}/search` },
}

export default function SearchPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold mb-4">Keresés</h1>
          <Suspense fallback={<p className="text-muted-foreground">Keresés betöltése...</p>}>
            <SearchContent />
          </Suspense>
        </div>
      </section>
      <Footer />
    </main>
  )
}