import Link from "next/link"
import { Card } from "@/components/ui/card"
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function SocialLinks({ className }: { className?: string }) {
  return (
    <Card className={cn("border-2 border-border rounded-lg overflow-hidden bg-muted/10", className)}>
      <div className="h-1 bg-primary" />
      <div className="p-4">
        <h3 className="text-xs tracking-wider uppercase text-primary mb-3">Közösségi Média</h3>

        <div className="grid gap-2">
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-3 py-2 rounded-md border border-border hover:border-primary transition-colors"
          >
            <FacebookIcon className="size-4 text-muted-foreground" />
            <span className="text-sm">Facebook</span>
          </Link>

          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-3 py-2 rounded-md border border-border hover:border-primary transition-colors"
          >
            <InstagramIcon className="size-4 text-muted-foreground" />
            <span className="text-sm">Instagram</span>
          </Link>

          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-3 py-2 rounded-md border border-border hover:border-primary transition-colors"
          >
            <TwitterIcon className="size-4 text-muted-foreground" />
            <span className="text-sm">Twitter</span>
          </Link>

          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-3 py-2 rounded-md border border-border hover:border-primary transition-colors"
          >
            <YoutubeIcon className="size-4 text-muted-foreground" />
            <span className="text-sm">YouTube</span>
          </Link>
        </div>
      </div>
    </Card>
  )
}