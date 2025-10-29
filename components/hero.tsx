export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background pattern */}
      <div className="absolute inset-0 art-deco-pattern opacity-20" />
      <div className="absolute inset-0 concrete-texture" />

      {/* Geometric decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 border-2 border-primary/30 rotate-45" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 border-2 border-primary/20 rotate-12" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-primary" />
            <span className="text-xs tracking-[0.3em] text-primary uppercase">Tech & Sci-Fi Blog</span>
            <div className="h-px w-20 bg-primary" />
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 text-balance leading-tight">
            <span className="block text-foreground">Felfedezve a</span>
            <span className="block text-primary mt-2">Jövő Határait</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-serif">
            Kritikák, elemzések és gondolatok a sci-fi univerzumról: könyvek, filmek, sorozatok, játékok és technológia
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative px-8 py-4 bg-primary text-primary-foreground font-medium tracking-wide uppercase overflow-hidden transition-all hover:scale-105">
              <span className="relative z-10">Cikkek Felfedezése</span>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-primary text-primary font-medium tracking-wide uppercase hover:bg-primary hover:text-primary-foreground transition-all">
              Archívum Megtekintése
            </button>
          </div>

          {/* Decorative bottom element */}
          <div className="mt-20 flex items-center justify-center">
            <div className="relative">
              <div className="w-1 h-16 bg-primary/50" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 border-2 border-primary rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
