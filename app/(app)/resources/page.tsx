import type { Metadata } from "next"
import { NodeListing } from "@/components/drupal/shared/NodeListing"
import { getNodeListing } from "@/lib/queries/node-listing"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Whitepapers, guides, checklists, and reports from Wilkes & Liberty.",
}

export default async function ResourcesIndex() {
  const { nodes } = await getNodeListing("resource")
  return (
    <NodeListing
      title="Resources."
      intro="Downloads, guides, and reference materials."
      eyebrow="Resource"
      nodes={nodes}
      emptyMessage="No resources published yet."
    />
  )
}
