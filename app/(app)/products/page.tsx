import type { Metadata } from "next"
import { NodeListing } from "@/components/drupal/shared/NodeListing"
import { getNodeListing } from "@/lib/queries/node-listing"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Self-deployable sovereign technology platforms from Wilkes & Liberty.",
}

export default async function ProductsIndex() {
  const { nodes } = await getNodeListing("product")
  return (
    <NodeListing
      title="Products."
      intro="Sovereign platforms — deployable on-premises, in private cloud, hybrid, or air-gapped."
      eyebrow="Product"
      nodes={nodes}
      emptyMessage="No products published yet."
    />
  )
}
