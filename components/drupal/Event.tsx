import { CtaLinks } from "@/components/drupal/shared/CtaLinks"
import { NodeHero } from "@/components/drupal/shared/NodeHero"
import { ProseBody } from "@/components/drupal/shared/ProseBody"
import { Section } from "@/components/drupal/shared/Section"
import { mediaToImage } from "@/lib/drupal-media"
import { formatDate } from "@/lib/utils"
import type { DrupalEvent } from "@/types"

function eventTypeLabel(value: DrupalEvent["eventType"]): string | null {
  if (!value) return null
  if (typeof value === "string") return value
  return value.name ?? null
}

function eventDateRange(eventDate: DrupalEvent["eventDate"]): string | null {
  if (!eventDate?.value) return null
  const start = formatDate(eventDate.value)
  if (!eventDate.endValue) return start
  const end = formatDate(eventDate.endValue)
  return start === end ? start : `${start} – ${end}`
}

export function Event({ node }: { node: DrupalEvent }) {
  const eventTypeText = eventTypeLabel(node.eventType)
  const dateRange = eventDateRange(node.eventDate)
  return (
    <article>
      <NodeHero
        eyebrow={eventTypeText ?? "Event"}
        title={node.title}
        summary={node.summary}
        heroImage={mediaToImage(node.heroImage)}
      />

      {dateRange ? (
        <Section title="When">
          <p className="text-lg">{dateRange}</p>
        </Section>
      ) : null}

      <ProseBody body={node.body} />

      <CtaLinks primary={node.primaryCta} secondary={node.secondaryCta} />
    </article>
  )
}
