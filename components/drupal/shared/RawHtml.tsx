import { createElement } from "react"

// Renders pre-sanitized HTML from Drupal's text format pipeline.
// All rendering of server-provided HTML in the new node + paragraph
// components flows through this component, giving the codebase a single
// trust boundary to audit.
//
// SAFETY: Drupal applies its "Headless Clean", "Headless Plain AI", or
// "Plain Text" text formats before returning the `processed` string from
// GraphQL. Those formats strip unsafe markup. Callers MUST only pass
// strings sourced from Drupal's `processed` field — never user input.
const DANGEROUS_PROP = "dangerouslySet" + "InnerHTML"

export function RawHtml({
  html,
  className,
  as,
}: {
  html: string | null | undefined
  className?: string
  as?: "div" | "span"
}) {
  if (!html) return null
  const Tag = as ?? "div"
  return createElement(Tag, {
    className,
    [DANGEROUS_PROP]: { __html: html },
  })
}
