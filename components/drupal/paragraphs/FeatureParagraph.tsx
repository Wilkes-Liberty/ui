import Image from "next/image"
import { RawHtml } from "@/components/drupal/shared/RawHtml"
import type { ParagraphFeature } from "@/types"

export function FeatureParagraph({ data }: { data: ParagraphFeature }) {
  const body = data.body?.processed
  if (!data.title && !body) return null
  return (
    <div className="my-4 p-4">
      {data.icon?.url ? (
        <div className="mb-3">
          <Image
            src={data.icon.url}
            width={40}
            height={40}
            alt={data.icon.alt ?? ""}
          />
        </div>
      ) : null}
      {data.title ? (
        <h3 className="mb-2 text-xl font-semibold">{data.title}</h3>
      ) : null}
      <RawHtml html={body} className="text-gray-700 prose" />
    </div>
  )
}
