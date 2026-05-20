import type { ReactNode } from "react"

interface SectionProps {
  title?: string
  intro?: string
  children: ReactNode
  className?: string
}

export function Section({ title, intro, children, className }: SectionProps) {
  return (
    <section className={`my-12 ${className ?? ""}`.trim()}>
      {title ? (
        <h2 className="mb-3 text-3xl font-bold">{title}</h2>
      ) : null}
      {intro ? <p className="mb-6 text-gray-700">{intro}</p> : null}
      {children}
    </section>
  )
}
