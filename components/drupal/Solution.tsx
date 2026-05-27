import { CtaLinks } from "@/components/drupal/shared/CtaLinks"
import { MetadataChips } from "@/components/drupal/shared/MetadataChips"
import { NodeHero } from "@/components/drupal/shared/NodeHero"
import { ProseBody } from "@/components/drupal/shared/ProseBody"
import { RawHtml } from "@/components/drupal/shared/RawHtml"
import { Section } from "@/components/drupal/shared/Section"
import { CapabilityParagraph } from "@/components/drupal/paragraphs/CapabilityParagraph"
import { OutcomeParagraph } from "@/components/drupal/paragraphs/OutcomeParagraph"
import { mediaToImage } from "@/lib/drupal-media"
import type {
  DrupalSolution,
  ParagraphCapability,
  ParagraphOutcome,
} from "@/types"

export function Solution({ node }: { node: DrupalSolution }) {
  return (
    <article>
      <NodeHero
        eyebrow="Solution"
        title={node.title}
        summary={node.summary}
        heroImage={mediaToImage(node.heroImage)}
      />

      {/* Classification chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        <MetadataChips label="Platform" terms={node.platform} />
        <MetadataChips label="Target Sectors" terms={node.targetSectors} />
        <MetadataChips label="Industries" terms={node.industries} />
        <MetadataChips label="Compliance" terms={node.compliance} />
      </div>

      {node.missionImpact?.processed ? (
        <Section title="Mission impact">
          <RawHtml
            html={node.missionImpact.processed}
            className="prose max-w-none text-lg"
          />
        </Section>
      ) : null}

      <ProseBody body={node.body} />

      {node.outcomes?.length ? (
        <Section title="Outcomes">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {node.outcomes.map((p, i) =>
              p.__typename === "ParagraphOutcome" ? (
                <OutcomeParagraph key={i} data={p as ParagraphOutcome} />
              ) : null
            )}
          </div>
        </Section>
      ) : null}

      {node.keyCapabilities?.length ? (
        <Section title="Key capabilities">
          <ul className="not-prose">
            {node.keyCapabilities.map((p, i) =>
              p.__typename === "ParagraphCapability" ? (
                <CapabilityParagraph
                  key={i}
                  data={p as ParagraphCapability}
                />
              ) : null
            )}
          </ul>
        </Section>
      ) : null}

      {/* Related Platforms & Services that make up this Solution */}
      {node.related?.length ? (
        <Section title="What's included">
          <ul className="list-disc pl-5">
            {node.related.map((r, i) => (
              <li key={i}>
                <a href={r.path ?? "#"} className="text-blue-700 hover:underline">
                  {r.title}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaLinks primary={node.primaryCta} secondary={node.secondaryCta} />
    </article>
  )
}
