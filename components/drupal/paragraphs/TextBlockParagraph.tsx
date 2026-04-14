import type { ParagraphTextBlock } from "@/types"

/**
 * Text block paragraph.
 * body.processed is pre-sanitized by Drupal's text format pipeline.
 */
export function TextBlockParagraph({ data }: { data: ParagraphTextBlock }) {
  const html = data.body?.processed
  if (!html) return null
  // eslint-disable-next-line react/no-danger
  return (
    <div
      className="landing-p"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
