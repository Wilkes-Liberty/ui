import { DraftAlert } from "@/components/misc/DraftAlert"
import { HeaderNav } from "@/components/navigation/HeaderNav"
import type { ReactNode } from "react"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DraftAlert />
      <div className="max-w-screen-md px-6 mx-auto">
        <HeaderNav />
        <main className="container py-10 mx-auto">{children}</main>
      </div>
    </>
  )
}
