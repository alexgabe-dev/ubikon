import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-secondary" />
      <div className="absolute inset-0 art-deco-pattern opacity-10" />

      {/* Geometric decorations */}
      <div className="absolute top-10 left-1/4 w-24 h-24 border border-primary/20 rotate-45" />
      <div className="absolute bottom-10 right-1/4 w-32 h-32 border border-primary/20 -rotate-12" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-16 h-16 border-2 border-primary rotate-45" />
              <div className="absolute inset-0 w-16 h-16 bg-primary/20 rotate-45 translate-x-1 translate-y-1" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">Csatlakozz az Adáshoz</h2>

          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            Iratkozz fel, hogy megkapd a legújabb sci-fi történeteket, esszéket és felfedezéseket közvetlenül a neurális
            interfészedre
          </p>

          {/* Form */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="EMAIL@DOMAIN.HU"
              className="flex-1 bg-background border-2 border-border focus:border-primary uppercase tracking-wide text-sm placeholder:text-muted-foreground/50"
            />
            <Button className="bg-primary text-primary-foreground hover:bg-accent uppercase tracking-wide px-8">
              Feliratkozás
            </Button>
          </div>

          {/* Privacy note */}
          <p className="text-xs text-muted-foreground mt-6 uppercase tracking-wide">
            Nincs spam. Bármikor leiratkozhatsz. Az adatvédelem tiszteletben tartva.
          </p>
        </div>
      </div>
    </section>
  )
}
