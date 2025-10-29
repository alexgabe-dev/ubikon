import { NextResponse } from "next/server"
import { client } from "@/sanity/client"
import { searchPostsQuery } from "@/sanity/queries"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const raw = (searchParams.get("q") || "").trim()
  if (!raw) return NextResponse.json([])
  // GROQ match uses wildcard; search anywhere in the text
  const q = `*${raw}*`
  try {
    const results = await client.fetch(searchPostsQuery, { q })
    return NextResponse.json(results)
  } catch (e) {
    console.error("[ubikon] search api error", e)
    return NextResponse.json({ error: "search_failed" }, { status: 500 })
  }
}