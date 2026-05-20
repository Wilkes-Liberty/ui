import type { TaxonomyTermRef } from "@/types"

interface MetadataChipsProps {
  label?: string
  terms?: TaxonomyTermRef[] | null
}

export function MetadataChips({ label, terms }: MetadataChipsProps) {
  if (!terms?.length) return null
  return (
    <div className="my-4">
      {label ? (
        <span className="mr-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
          {label}:
        </span>
      ) : null}
      <span className="inline-flex flex-wrap gap-2">
        {terms.map((t, i) =>
          t?.name ? (
            <span
              key={`${t.name}-${i}`}
              className="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-700"
            >
              {t.name}
            </span>
          ) : null
        )}
      </span>
    </div>
  )
}
