import { DraftAlert } from "@/components/misc/DraftAlert"
import { HeaderNav } from "@/components/navigation/HeaderNav"
import type { ReactNode } from "react"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DraftAlert />
      {/* HeaderNav is full-width — lives outside the content-width container */}
      <HeaderNav />
      <div className="max-w-screen-md px-6 mx-auto">
        <main className="py-10">{children}</main>
      </div>
    </>
  )
}
