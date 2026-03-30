import { DraftAlert } from "@/components/misc/DraftAlert"
import { HeaderNav } from "@/components/navigation/HeaderNav"
import type { Metadata } from "next"
import type { ReactNode } from "react"

import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: "Wilkes Liberty",
    template: "%s | Wilkes Liberty",
  },
  description:
    "Wilkes Liberty — strategic consulting and advisory services helping organizations navigate complex challenges.",
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
      "Wilkes Liberty — strategic consulting and advisory services helping organizations navigate complex challenges.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wilkes Liberty",
    description:
      "Wilkes Liberty — strategic consulting and advisory services helping organizations navigate complex challenges.",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <DraftAlert />
        <div className="max-w-screen-md px-6 mx-auto">
          <HeaderNav />
          <main className="container py-10 mx-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
