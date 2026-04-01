import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
}

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="mb-4 text-6xl font-black">404</h1>
      <h2 className="mb-4 text-2xl font-bold">Page Not Found</h2>
      <p className="mb-8 text-gray-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2 text-white bg-black rounded hover:bg-gray-800 transition-colors"
      >
        Go home
      </Link>
    </div>
  )
}
