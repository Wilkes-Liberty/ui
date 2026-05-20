import type { Metadata } from "next"
import { NodeListing } from "@/components/drupal/shared/NodeListing"
import { getNodeListing } from "@/lib/queries/node-listing"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Case studies",
  description: "Customer success stories and outcomes.",
}

export default async function CaseStudiesIndex() {
  const { nodes } = await getNodeListing("case_study")
  return (
    <NodeListing
      title="Case studies."
      intro="Quantified outcomes from real engagements."
      eyebrow="Case study"
      nodes={nodes}
      emptyMessage="No case studies published yet."
    />
  )
}
