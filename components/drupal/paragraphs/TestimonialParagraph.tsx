import { RawHtml } from "@/components/drupal/shared/RawHtml"
import type { ParagraphTestimonial } from "@/types"

export function TestimonialParagraph({
  data,
}: {
  data: ParagraphTestimonial
}) {
  const quote = data.quote?.processed
  if (!quote && !data.attribution) return null
  return (
    <blockquote className="my-8 pl-6 border-l-4 border-gray-300 italic">
      <RawHtml html={quote} className="prose max-w-none" />
      {data.attribution ? (
        <footer className="mt-3 not-italic text-sm text-gray-600">
          — {data.attribution}
        </footer>
      ) : null}
    </blockquote>
  )
}
