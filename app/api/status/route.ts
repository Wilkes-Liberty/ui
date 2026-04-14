import { NextResponse } from "next/server"

// Never cache — we want live status.
export const dynamic = "force-dynamic"
export const revalidate = 0

type ServiceCheck = {
  up: boolean
  latencyMs?: number
  status?: number
}

type StatusServices = {
  gateway: ServiceCheck
  frontend: ServiceCheck
  api: ServiceCheck
  identity: ServiceCheck
  data: ServiceCheck
  cache: ServiceCheck
  search: ServiceCheck
  mesh: ServiceCheck
  monitoring: ServiceCheck
  storage: ServiceCheck
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

async function fetchDrupalStatus(apiUrl: string): Promise<Record<string, ServiceCheck>> {
  try {
    const res = await fetch(`${apiUrl}/api/system-status`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return {}
    const json = await res.json()
    return json?.services ?? {}
  } catch {
    return {}
  }
}

export async function GET() {
  const apiUrl =
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ??
    process.env.DRUPAL_BASE_URL ??
    "https://api.wilkesliberty.com"
  const identityUrl =
    process.env.NEXT_PUBLIC_IDENTITY_URL ?? "https://auth.wilkesliberty.com"

  // Edge / self checks (parallel)
  const [identity, api, drupalServices] = await Promise.all([
    check(identityUrl, 3000, [200, 302, 303]),
    check(`${apiUrl}/user/login`, 3000, [200]),
    fetchDrupalStatus(apiUrl),
  ])

  // Down marker for services we'd ask Drupal about but Drupal isn't responding.
  const fallback: ServiceCheck = { up: false }

  const services: StatusServices = {
    // VPS Caddy — always up if we're responding (we're behind it)
    gateway: { up: true, latencyMs: 0 },
    // Next.js itself — up if this handler runs
    frontend: { up: true, latencyMs: 0 },
    // Public-checkable
    api,
    identity,
    // Drupal-aggregated (Postgres, Redis, Solr, Tailscale, Prometheus, NAS)
    data: drupalServices.data ?? fallback,
    cache: drupalServices.cache ?? fallback,
    search: drupalServices.search ?? fallback,
    mesh: drupalServices.mesh ?? fallback,
    monitoring: drupalServices.monitoring ?? fallback,
    storage: drupalServices.storage ?? fallback,
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    services,
  })
}
