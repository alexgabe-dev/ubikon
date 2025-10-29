import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron, Goldman, Domine } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

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
  title: "UBIKON - Sci-Fi Blog",
  description: "A brutalist-art deco fusion sci-fi blog exploring the future"
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
