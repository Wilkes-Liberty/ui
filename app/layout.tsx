import type { Metadata } from "next"
import type { ReactNode } from "react"

import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: "Wilkes Liberty",
    template: "%s | Wilkes Liberty",
  },
  description:
    "Sovereign infrastructure for defense, intelligence, and critical infrastructure.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://wilkesliberty.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Wilkes Liberty",
    title: "Wilkes Liberty",
    description:
      "Sovereign infrastructure for defense, intelligence, and critical infrastructure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wilkes Liberty",
    description:
      "Sovereign infrastructure for defense, intelligence, and critical infrastructure.",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
