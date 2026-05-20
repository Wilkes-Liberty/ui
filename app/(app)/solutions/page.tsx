import type { Metadata } from "next"
import { NodeListing } from "@/components/drupal/shared/NodeListing"
import { getNodeListing } from "@/lib/queries/node-listing"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Solutions",
  description: "Bundled solutions combining products, services, and outcomes.",
}

export default async function SolutionsIndex() {
  const { nodes } = await getNodeListing("solution")
  return (
    <NodeListing
      title="Solutions."
      intro="Integrated answers to mission-critical problems."
      eyebrow="Solution"
      nodes={nodes}
      emptyMessage="No solutions published yet."
    />
  )
}
