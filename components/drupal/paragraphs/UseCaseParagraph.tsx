import { RawHtml } from "@/components/drupal/shared/RawHtml"
import type { ParagraphUseCase } from "@/types"

export function UseCaseParagraph({ data }: { data: ParagraphUseCase }) {
  const challenge = data.challenge?.processed
  const solution = data.solution?.processed
  const results = data.results?.processed
  if (!data.useCaseTitle && !challenge && !solution && !results) return null
  return (
    <article className="my-6 p-6 bg-gray-50 rounded-lg">
      {data.useCaseTitle ? (
        <h3 className="mb-2 text-2xl font-bold">{data.useCaseTitle}</h3>
      ) : null}
      {data.sector?.name ? (
        <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Sector: {data.sector.name}
        </div>
      ) : null}
      {challenge ? (
        <div className="mt-4">
          <h4 className="text-sm font-bold uppercase text-gray-600">Challenge</h4>
          <RawHtml html={challenge} className="prose max-w-none" />
        </div>
      ) : null}
      {solution ? (
        <div className="mt-4">
          <h4 className="text-sm font-bold uppercase text-gray-600">Solution</h4>
          <RawHtml html={solution} className="prose max-w-none" />
        </div>
      ) : null}
      {results ? (
        <div className="mt-4">
          <h4 className="text-sm font-bold uppercase text-gray-600">Results</h4>
          <RawHtml html={results} className="prose max-w-none" />
        </div>
      ) : null}
    </article>
  )
}
