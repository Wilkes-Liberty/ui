import type { Metadata } from "next"
import { NodeListing } from "@/components/drupal/shared/NodeListing"
import { getNodeListing } from "@/lib/queries/node-listing"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Team",
  description: "The people behind Wilkes & Liberty.",
}

export default async function TeamIndex() {
  const { nodes } = await getNodeListing("person")
  return (
    <NodeListing
      title="Team."
      intro="People doing the work."
      eyebrow="Team"
      nodes={nodes}
      emptyMessage="Team profiles coming soon."
    />
  )
}
