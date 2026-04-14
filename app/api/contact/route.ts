import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

/**
 * POST /api/contact — proxy to Drupal's /api/contact endpoint.
 *
 * We proxy server-side rather than letting the browser hit Drupal directly so:
 *   1. The Drupal API hostname stays an implementation detail
 *   2. We can apply rate limiting / additional spam mitigation later
 *   3. Same-origin avoids any CORS concerns for clients
 */
export async function POST(request: NextRequest) {
  const apiUrl =
    process.env.DRUPAL_BASE_URL ??
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ??
    "https://api.wilkesliberty.com"

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  try {
    const res = await fetch(`${apiUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    })
    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch (err) {
    console.error("Contact proxy error:", err)
    return NextResponse.json(
      { error: "Upstream unreachable. Please email inquiry@wilkesliberty.com." },
      { status: 502 }
    )
  }
}
