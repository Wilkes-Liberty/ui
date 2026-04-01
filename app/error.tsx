"use client"

import { useEffect } from "react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to console in development; swap for a real logger (Sentry, etc.) in production
    console.error("[Error boundary]", error)
  }, [error])

  return (
    <div className="py-20 text-center">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
      <p className="mb-8 text-gray-600">
        We were unable to load this page. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 text-white bg-black rounded hover:bg-gray-800 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
