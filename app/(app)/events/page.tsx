import type { Metadata } from "next"
import { NodeListing } from "@/components/drupal/shared/NodeListing"
import { getNodeListing } from "@/lib/queries/node-listing"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past events, webinars, and workshops.",
}

export default async function EventsIndex() {
  const { nodes } = await getNodeListing("event")
  return (
    <NodeListing
      title="Events."
      intro="Webinars, conferences, and working sessions."
      eyebrow="Event"
      nodes={nodes}
      emptyMessage="No events scheduled."
    />
  )
}
