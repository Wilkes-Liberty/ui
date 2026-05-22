import { CtaLinks } from "@/components/drupal/shared/CtaLinks"
import { MetadataChips } from "@/components/drupal/shared/MetadataChips"
import { NodeHero } from "@/components/drupal/shared/NodeHero"
import { ProseBody } from "@/components/drupal/shared/ProseBody"
import { RawHtml } from "@/components/drupal/shared/RawHtml"
import { Section } from "@/components/drupal/shared/Section"
import { CapabilityParagraph } from "@/components/drupal/paragraphs/CapabilityParagraph"
import { mediaToImage } from "@/lib/drupal-media"
import type { DrupalService, ParagraphCapability } from "@/types"

export function Service({ node }: { node: DrupalService }) {
  return (
    <article>
      <NodeHero
        eyebrow="Service"
        title={node.title}
        summary={node.summary}
        heroImage={mediaToImage(node.heroImage)}
      />
      <div className="flex flex-wrap gap-2 mb-6">
        <MetadataChips label="Platform" terms={node.platform} />
        <MetadataChips label="Industries" terms={node.industries} />
        <MetadataChips label="Target Sectors" terms={node.targetSectors} />
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

      {node.defenseRelevance?.processed ? (
        <Section title="Defense & government relevance">
          <RawHtml
            html={node.defenseRelevance.processed}
            className="prose max-w-none"
          />
        </Section>
      ) : null}

      {node.related?.length ? (
        <Section title="Related products">
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
