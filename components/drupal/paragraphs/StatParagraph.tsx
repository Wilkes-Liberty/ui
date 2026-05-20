import type { ParagraphStat } from "@/types"

export function StatParagraph({ data }: { data: ParagraphStat }) {
  if (!data.value && !data.title) return null
  return (
    <div className="text-center my-6">
      <div className="text-4xl font-black">
        {data.value ?? ""}
        {data.suffix ? <span className="text-2xl">{data.suffix}</span> : null}
      </div>
      {data.title ? (
        <div className="mt-1 text-sm uppercase tracking-wider text-gray-600">
          {data.title}
        </div>
      ) : null}
    </div>
  )
}
