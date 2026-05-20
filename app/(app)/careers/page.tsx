import type { Metadata } from "next"
import { NodeListing } from "@/components/drupal/shared/NodeListing"
import { getNodeListing } from "@/lib/queries/node-listing"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at Wilkes & Liberty.",
}

export default async function CareersIndex() {
  const { nodes } = await getNodeListing("career")
  return (
    <NodeListing
      title="Careers."
      intro="Open positions. Mission-aligned work."
      eyebrow="Open role"
      nodes={nodes}
      emptyMessage="No open positions at this time."
    />
  )
}
