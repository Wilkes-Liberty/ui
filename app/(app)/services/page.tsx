import type { Metadata } from "next"
import { NodeListing } from "@/components/drupal/shared/NodeListing"
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
    <NodeListing
      title="Services."
      intro="Engineering and advisory engagements for organizations where failure is not an abstraction."
      eyebrow="Service"
      nodes={nodes}
      emptyMessage="No services published yet."
    />
  )
}
