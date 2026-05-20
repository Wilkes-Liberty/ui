import { RawHtml } from "@/components/drupal/shared/RawHtml"
import type { ParagraphFaqGroup, ParagraphFaqItem } from "@/types"

function FaqItem({ item }: { item: ParagraphFaqItem }) {
  const body = item.body?.processed
  if (!item.title && !body) return null
  return (
    <details className="py-3 border-b border-gray-200">
      <summary className="cursor-pointer font-semibold">
        {item.title ?? "Question"}
      </summary>
      <RawHtml html={body} className="mt-2 text-gray-700 prose max-w-none" />
    </details>
  )
}

export function FaqGroupParagraph({ data }: { data: ParagraphFaqGroup }) {
  if (!data.items?.length && !data.title) return null
  return (
    <section className="my-8">
      {data.title ? (
        <h3 className="mb-4 text-2xl font-bold">{data.title}</h3>
      ) : null}
      {data.items?.map((item, i) => <FaqItem key={i} item={item} />) ?? null}
    </section>
  )
}
