import { Link } from "@/components/navigation/Link"
import { drupalHtml } from "@/lib/drupal-html"
import type { ProcessedText } from "@/types"

interface NodeTeaserProps {
  title: string
  path: string
  summary?: ProcessedText | string | null
  eyebrow?: string | null
}

export function NodeTeaser({
  title,
  path,
  summary,
  eyebrow,
}: NodeTeaserProps) {
  const summaryText =
    typeof summary === "string" ? summary : summary?.processed ?? null
  const html = drupalHtml(summaryText)
  return (
    <article className="py-6 border-b border-gray-200">
      {eyebrow ? (
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
          {eyebrow}
        </div>
      ) : null}
      <Link href={path} className="no-underline hover:text-blue-600">
        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      </Link>
      {html ? (
        <div
          className="text-gray-700 prose max-w-none"
          dangerouslySetInnerHTML={html}
        />
      ) : null}
    </article>
  )
}
