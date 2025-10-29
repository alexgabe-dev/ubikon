import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron, Goldman, Domine } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const goldman = Goldman({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-brand",
  display: "swap",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
})

const domine = Domine({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "UBIKON – Sci‑Fi Blog",
    template: "%s | UBIKON",
  },
  description: "Brutális részletességgel megírt sci‑fi kritikák, hírek és elemzések.",
  keywords: [
    "sci-fi",
    "scifi",
    "science fiction",
    "filmek",
    "sorozatok",
    "könyvek",
    "játékok",
    "kritika",
    "elemzés",
  ],
  authors: [{ name: "UBIKON" }],
  creator: "UBIKON",
  publisher: "UBIKON",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "UBIKON – Sci‑Fi Blog",
    description: "Brutális részletességgel megírt sci‑fi kritikák, hírek és elemzések.",
    siteName: "UBIKON",
    images: [
      {
        url: `${siteUrl}/placeholder.jpg`,
        width: 1200,
        height: 630,
        alt: "UBIKON – Sci‑Fi Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UBIKON – Sci‑Fi Blog",
    description: "Brutális részletességgel megírt sci‑fi kritikák, hírek és elemzések.",
    images: [`${siteUrl}/placeholder.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hu">
      <body className={`${inter.variable} ${goldman.variable} ${orbitron.variable} ${domine.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
