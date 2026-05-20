import Image from "next/image"
import { RawHtml } from "@/components/drupal/shared/RawHtml"
import type { ParagraphCapability } from "@/types"

export function CapabilityParagraph({ data }: { data: ParagraphCapability }) {
  const desc = data.capabilityDescription?.processed
  if (!data.capabilityTitle && !desc && !data.missionBenefit) return null
  return (
    <li className="flex gap-4 py-4 border-b border-gray-100 list-none">
      {data.icon?.url ? (
        <div className="shrink-0">
          <Image
            src={data.icon.url}
            width={48}
            height={48}
            alt={data.icon.alt ?? ""}
          />
        </div>
      ) : null}
      <div>
        {data.capabilityTitle ? (
          <h3 className="mb-1 text-xl font-semibold">{data.capabilityTitle}</h3>
        ) : null}
        <RawHtml html={desc} className="text-gray-700 prose" />
        {data.missionBenefit ? (
          <div className="mt-2 text-sm font-medium text-blue-700">
            Mission benefit: {data.missionBenefit}
          </div>
        ) : null}
      </div>
    </li>
  )
}
