import type { ParagraphOutcome } from "@/types"

export function OutcomeParagraph({ data }: { data: ParagraphOutcome }) {
  if (!data.metricValue && !data.metricLabel) return null
  return (
    <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
      {data.metricValue ? (
        <div className="text-5xl font-black text-blue-700">
          {data.metricValue}
        </div>
      ) : null}
      {data.metricLabel ? (
        <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-gray-600">
          {data.metricLabel}
        </div>
      ) : null}
      {data.missionBenefit ? (
        <div className="mt-3 text-sm text-gray-700">{data.missionBenefit}</div>
      ) : null}
    </div>
  )
}
