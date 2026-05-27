import type { Metadata } from "next"
import { PlatformTeaser } from "@/components/drupal/PlatformTeaser"
import { getNodeListing } from "@/lib/queries/node-listing"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Platforms",
  description:
    "Self-deployable sovereign technology platforms from Wilkes & Liberty.",
}

export default async function PlatformsIndex() {
  const { nodes } = await getNodeListing("platform")

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-3">Platforms.</h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-10">
        Sovereign platforms — deployable on-premises, in private cloud, hybrid, or air-gapped.
      </p>

      {nodes.length === 0 ? (
        <p className="text-gray-500">No platforms published yet.</p>
      ) : (
        <div>
          {nodes.map((node) => (
            <PlatformTeaser key={node.id} node={node} />
          ))}
        </div>
      )}
    </div>
  )
}
