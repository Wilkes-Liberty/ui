import type { Metadata } from "next"
import { SolutionTeaser } from "@/components/drupal/SolutionTeaser"
import { getNodeListing } from "@/lib/queries/node-listing"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Solutions",
  description: "Bundled solutions combining products, services, and outcomes.",
}

export default async function SolutionsIndex() {
  const { nodes } = await getNodeListing("solution")

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-3">Solutions.</h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-10">
        Integrated answers to mission-critical problems.
      </p>

      {nodes.length === 0 ? (
        <p className="text-gray-500">No solutions published yet.</p>
      ) : (
        <div>
          {nodes.map((node) => (
            <SolutionTeaser key={node.id} node={node} />
          ))}
        </div>
      )}
    </div>
  )
}
