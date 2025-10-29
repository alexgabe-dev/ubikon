import Link from "next/link"
import { Card } from "@/components/ui/card"

export function QuickLinks() {
  return (
    <Card className="border-2 border-border rounded-lg overflow-hidden bg-muted/10">
      <div className="h-1 bg-primary" />
      <div className="p-4">
        <h3 className="text-xs tracking-wider uppercase text-primary mb-3">Gyors elérés</h3>
        <div className="grid gap-2">
          <Link href="/archive" className="inline-flex items-center justify-between px-3 py-2 rounded-md border border-border hover:border-primary transition-colors">
            <span className="text-sm">Archívum</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/search" className="inline-flex items-center justify-between px-3 py-2 rounded-md border border-border hover:border-primary transition-colors">
            <span className="text-sm">Keresés</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/filmek" className="inline-flex items-center justify-between px-3 py-2 rounded-md border border-border hover:border-primary transition-colors">
            <span className="text-sm">Filmek</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/sorozatok" className="inline-flex items-center justify-between px-3 py-2 rounded-md border border-border hover:border-primary transition-colors">
            <span className="text-sm">Sorozatok</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </Card>
  )
}