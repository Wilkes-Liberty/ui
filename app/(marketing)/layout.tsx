import { FooterNav } from "@/components/navigation/FooterNav"
import type { ReactNode } from "react"

// Marketing layout — no HeaderNav (landing page is standalone and full-bleed)
// but includes FooterNav so users have onward navigation after scrolling.
export default function MarketingLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      {children}
      <FooterNav />
    </>
  )
}
