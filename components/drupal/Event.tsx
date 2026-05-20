import { CtaLinks } from "@/components/drupal/shared/CtaLinks"
import { NodeHero } from "@/components/drupal/shared/NodeHero"
import { ProseBody } from "@/components/drupal/shared/ProseBody"
import { Section } from "@/components/drupal/shared/Section"
import { formatDate } from "@/lib/utils"
import type { DrupalEvent } from "@/types"

function eventTypeLabel(value: DrupalEvent["eventType"]): string | null {
  if (!value) return null
  if (typeof value === "string") return value
  return value.name ?? null
}

function formatRange(start?: string | null, end?: string | null): string | null {
  if (!start) return null
  try {
    const s = formatDate(start)
    if (!end) return s
    return `${s} → ${formatDate(end)}`
  } catch {
    return start
  }
}

export function Event({ node }: { node: DrupalEvent }) {
  const eventTypeText = eventTypeLabel(node.eventType)
  const dateRange = formatRange(
    node.eventDate?.value,
    node.eventDate?.endValue
  )
  return (
    <article>
      <NodeHero
        eyebrow={eventTypeText ?? "Event"}
        title={node.title}
        summary={node.summary}
        heroImage={node.heroImage}
      />
      {dateRange ? (
        <Section>
          <div className="text-lg font-semibold text-gray-800">
            {dateRange}
            {node.eventDate?.timezone ? (
              <span className="ml-2 text-sm text-gray-500">
                ({node.eventDate.timezone})
              </span>
            ) : null}
          </div>
        </Section>
      ) : null}

      <ProseBody body={node.body} />

      <CtaLinks primary={node.primaryCta} secondary={node.secondaryCta} />
    </article>
  )
}
