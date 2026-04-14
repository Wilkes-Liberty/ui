"use client"

import { useEffect, useState } from "react"

type ServiceStatus = {
  up: boolean
  latencyMs?: number
}

type StatusResponse = {
  services: Record<string, ServiceStatus>
  timestamp: string
}

// Order matters — left to right on screen.
const LABELS: Array<[string, string]> = [
  ["gateway", "Gateway"],
  ["frontend", "Frontend"],
  ["api", "API"],
  ["identity", "Identity"],
  ["data", "Data"],
  ["cache", "Cache"],
  ["search", "Search"],
  ["mesh", "Mesh"],
  ["monitoring", "Telemetry"],
  ["storage", "Storage"],
]

export function StatusIndicators() {
  const [status, setStatus] = useState<StatusResponse | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/status", { cache: "no-store" })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: StatusResponse = await res.json()
        if (!cancelled) {
          setStatus(data)
          setError(false)
        }
      } catch {
        if (!cancelled) setError(true)
      }
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, 30000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="status-bar">
      {LABELS.map(([key, label], idx) => {
        const service = status?.services[key]
        const isUp = service?.up ?? false
        const isLoading = !status && !error
        return (
          <div key={key} className="status-item">
            <div
              className={`status-dot ${
                isLoading
                  ? "status-dot-loading"
                  : isUp
                  ? "status-dot-up"
                  : "status-dot-down"
              }`}
              style={{ animationDelay: `${(idx * 0.4) % 4}s` }}
            />
            <span>{label}</span>
          </div>
        )
      })}
    </div>
  )
}
