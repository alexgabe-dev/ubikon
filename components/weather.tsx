import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type WeatherData = {
  temperature?: number
  windspeed?: number
  weathercode?: number
  is_day?: number
}

function codeToLabel(code?: number) {
  const map: Record<number, string> = {
    0: "Derült",
    1: "Többnyire derült",
    2: "Részben felhős",
    3: "Borult",
    45: "Köd",
    48: "Deres köd",
    51: "Gyenge szitálás",
    53: "Közepes szitálás",
    55: "Erős szitálás",
    61: "Gyenge eső",
    63: "Eső",
    65: "Erős eső",
    71: "Gyenge havazás",
    73: "Havazás",
    75: "Erős havazás",
    80: "Zápor",
    81: "Erősebb zápor",
    82: "Heves zápor",
    95: "Vihar",
    96: "Vihar jéggel",
    99: "Heves vihar jéggel",
  }
  return map[code ?? -1] ?? "Ismeretlen"
}

export const revalidate = 1800 // 30 perc cache

export async function WeatherWidget({
  latitude = 47.4979,
  longitude = 19.0402,
  city = "Budapest",
  className,
}: {
  latitude?: number
  longitude?: number
  city?: string
  className?: string
}) {
  let data: WeatherData | null = null
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`,
      { next: { revalidate } }
    )
    const json = await res.json()
    data = json?.current_weather ?? null
  } catch (e) {
    data = null
  }

  const now = new Date()
  const dateStr = new Intl.DateTimeFormat("hu-HU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now)

  return (
    <Card className={cn("border-2 border-border rounded-lg overflow-hidden bg-muted/10", className)}>
      {/* fejléccsík az arculathoz */}
      <div className="h-1 bg-primary" />
      <div className="p-5 lg:p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs tracking-wider uppercase text-primary">Időjárás</h3>
          <span className="text-xs text-muted-foreground">{city}</span>
        </div>

        <p className="text-muted-foreground text-sm mb-4">{dateStr}</p>

        <div className="flex items-baseline gap-3 mb-2">
          <div className="text-4xl font-serif font-bold">
            {typeof data?.temperature === "number" ? Math.round(data!.temperature) : "–"}
            <span className="text-xl align-top">°C</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {codeToLabel(data?.weathercode)}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md border border-border px-3 py-2 bg-background/40">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Szél</div>
            <div className="font-medium">
              {typeof data?.windspeed === "number" ? Math.round(data!.windspeed) : "–"} km/h
            </div>
          </div>
          <div className="rounded-md border border-border px-3 py-2 bg-background/40">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Napszak</div>
            <div className="font-medium">{data?.is_day ? "Nappal" : "Éjszaka"}</div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Frissítés: 30 perc</div>
          <div className="text-[11px] text-muted-foreground">Open‑Meteo</div>
        </div>
      </div>
    </Card>
  )
}