import { NextResponse } from "next/server"

// Never cache — we want live status.
export const dynamic = "force-dynamic"
export const revalidate = 0

type ServiceCheck = {
  up: boolean
  latencyMs?: number
  status?: number
}

async function check(
  url: string,
  timeoutMs = 3000,
  acceptedStatuses: number[] = [200, 302]
): Promise<ServiceCheck> {
  const start = Date.now()
  try {
    const res = await fetch(url, {
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(timeoutMs),
    })
    return {
      up: acceptedStatuses.includes(res.status),
      latencyMs: Date.now() - start,
      status: res.status,
    }
  } catch {
    return { up: false, latencyMs: Date.now() - start }
  }
}

export async function GET() {
  // Gateway — this app itself. If we're responding, gateway is up.
  const gateway: ServiceCheck = { up: true, latencyMs: 0 }

  // Identity — Keycloak. Check its management health endpoint if accessible,
  // else fall back to the public auth URL.
  // Note: Keycloak returns 302 on /auth root (redirect to admin console).
  const identityUrl =
    process.env.NEXT_PUBLIC_IDENTITY_URL ?? "https://auth.wilkesliberty.com"

  // API — Drupal backend.
  const apiUrl =
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ??
    process.env.DRUPAL_BASE_URL ??
    "https://api.wilkesliberty.com"

  // Data — we check Drupal's /user/login which requires a DB query. If Drupal
  // can serve that page (200), we know Postgres is reachable and responsive.
  // This is a transitive check — API up ⇒ Data up.
  const [identity, api] = await Promise.all([
    check(identityUrl, 3000, [200, 302, 303]),
    check(`${apiUrl}/user/login`, 3000, [200]),
  ])

  // Data status piggybacks on API status since Drupal serving /user/login
  // proves both Postgres and Redis are working.
  const data: ServiceCheck = api.up
    ? { up: true, latencyMs: api.latencyMs }
    : { up: false }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    services: {
      gateway,
      identity,
      api,
      data,
    },
  })
}
