import type { Metadata } from "next"
import { ServiceTeaser } from "@/components/drupal/ServiceTeaser"
import { getNodeListing } from "@/lib/queries/node-listing"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Consulting, implementation, and managed services from Wilkes & Liberty.",
}

export default async function ServicesIndex() {
  const { nodes } = await getNodeListing("service")

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-3">Services.</h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-10">
        Engineering and advisory engagements for organizations where failure is not an abstraction.
      </p>

      {nodes.length === 0 ? (
        <p className="text-gray-500">No services published yet.</p>
      ) : (
        <div>
          {nodes.map((node) => (
            <ServiceTeaser key={node.id} node={node} />
          ))}
        </div>
      )}
    </div>
  )
}
