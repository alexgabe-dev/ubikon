import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute inset-0 concrete-texture opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-primary" />
              <span className="text-xs tracking-[0.3em] text-primary uppercase">404 Hiba</span>
              <div className="h-px w-16 bg-primary" />
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6">Nem Található</h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              A keresett oldal nem létezik vagy áthelyezésre került.
            </p>

            <Link href="/">
              <Button size="lg" className="uppercase tracking-wide">
                Vissza a Főoldalra
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
