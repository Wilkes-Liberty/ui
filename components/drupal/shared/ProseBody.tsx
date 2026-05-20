import { drupalHtml } from "@/lib/drupal-html"
import type { ProcessedText } from "@/types"

export function ProseBody({
  body,
  className,
}: {
  body?: ProcessedText | null
  className?: string
}) {
  const html = drupalHtml(body?.processed)
  if (!html) return null
  return (
    <div
      className={
        className ?? "mt-6 font-serif text-xl leading-loose prose max-w-none"
      }
      dangerouslySetInnerHTML={html}
    />
  )
}
