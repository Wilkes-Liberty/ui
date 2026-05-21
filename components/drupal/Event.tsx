import { CtaLinks } from "@/components/drupal/shared/CtaLinks"
import { NodeHero } from "@/components/drupal/shared/NodeHero"
import { ProseBody } from "@/components/drupal/shared/ProseBody"
import { mediaToImage } from "@/lib/drupal-media"
import type { DrupalEvent } from "@/types"

function eventTypeLabel(value: DrupalEvent["eventType"]): string | null {
  if (!value) return null
  if (typeof value === "string") return value
  return value.name ?? null
}

// TODO(webcms): event date display is hidden because graphql_compose
// does not currently expose the smart_date field. Restore the date
// section once the schema gap is closed.
export function Event({ node }: { node: DrupalEvent }) {
  const eventTypeText = eventTypeLabel(node.eventType)
  return (
    <article>
      <NodeHero
        eyebrow={eventTypeText ?? "Event"}
        title={node.title}
        summary={node.summary}
        heroImage={mediaToImage(node.heroImage)}
      />

      <ProseBody body={node.body} />

      <CtaLinks primary={node.primaryCta} secondary={node.secondaryCta} />
    </article>
  )
}
