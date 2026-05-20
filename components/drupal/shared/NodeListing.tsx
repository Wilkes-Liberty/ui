import { NodeTeaser } from "@/components/drupal/shared/NodeTeaser"
import type { ListingNode } from "@/lib/queries/node-listing"

interface NodeListingProps {
  title: string
  intro?: string
  eyebrow?: string
  nodes: ListingNode[]
  emptyMessage?: string
}

export function NodeListing({
  title,
  intro,
  eyebrow,
  nodes,
  emptyMessage = "Nothing here yet.",
}: NodeListingProps) {
  return (
    <>
      <h1 className="mb-4 text-5xl md:text-6xl font-black">{title}</h1>
      {intro ? (
        <p className="mb-10 text-xl text-gray-700 max-w-2xl">{intro}</p>
      ) : null}
      {nodes.length === 0 ? (
        <p className="py-8 text-gray-500">{emptyMessage}</p>
      ) : (
        <div>
          {nodes.map((node) => (
            <NodeTeaser
              key={node.id}
              title={node.title}
              path={node.path}
              summary={node.summary}
              eyebrow={eyebrow}
            />
          ))}
        </div>
      )}
    </>
  )
}
