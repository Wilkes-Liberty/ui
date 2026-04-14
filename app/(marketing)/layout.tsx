import type { ReactNode } from "react"

// Minimal layout for the marketing/holding page.
// No HeaderNav — landing page is standalone and full-bleed.
export default function MarketingLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
