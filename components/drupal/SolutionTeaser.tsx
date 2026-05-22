import { Link } from "@/components/navigation/Link"
import { drupalHtml } from "@/lib/drupal-html"
import type { ListingNode } from "@/lib/queries/node-listing"

interface SolutionTeaserProps {
  node: ListingNode
  eyebrow?: string
}

export function SolutionTeaser({ node, eyebrow = "Solution" }: SolutionTeaserProps) {
  const summaryText =
    typeof node.summary === "string"
      ? node.summary
      : node.summary?.processed ?? null

  const html = drupalHtml(summaryText)

  return (
    <article className="group py-6 border-b border-gray-200 last:border-b-0 transition-colors hover:bg-gray-50/60 rounded-sm -mx-2 px-2">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-blue-700">
        {eyebrow}
      </div>
      <Link href={node.path} className="no-underline hover:text-blue-700 block">
        <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors tracking-[-0.01em]">
          {node.title}
        </h2>
      </Link>
      {html && (
        <div
          className="mt-3 text-gray-600 prose prose-sm max-w-none prose-p:leading-snug"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </article>
  )
}
