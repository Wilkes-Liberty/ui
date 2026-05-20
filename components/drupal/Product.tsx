import { CtaLinks } from "@/components/drupal/shared/CtaLinks"
import { MetadataChips } from "@/components/drupal/shared/MetadataChips"
import { NodeHero } from "@/components/drupal/shared/NodeHero"
import { ProseBody } from "@/components/drupal/shared/ProseBody"
import { RawHtml } from "@/components/drupal/shared/RawHtml"
import { Section } from "@/components/drupal/shared/Section"
import { CapabilityParagraph } from "@/components/drupal/paragraphs/CapabilityParagraph"
import { mediaToImage } from "@/lib/drupal-media"
import type { DrupalProduct, ParagraphCapability } from "@/types"

export function Product({ node }: { node: DrupalProduct }) {
  return (
    <article>
      <NodeHero
        eyebrow="Product"
        title={node.title}
        summary={node.summary}
        heroImage={mediaToImage(node.heroImage)}
      />
      <MetadataChips label="Sectors" terms={node.targetSectors} />
      <MetadataChips label="Industries" terms={node.industries} />

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

      {node.deploymentOptions?.length ? (
        <Section title="Deployment options">
          <ul className="flex flex-wrap gap-2 list-none p-0">
            {node.deploymentOptions.map((opt, i) => (
              <li
                key={`${opt}-${i}`}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {opt}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {node.sovereigntyFeatures?.processed ? (
        <Section title="Sovereignty features">
          <RawHtml
            html={node.sovereigntyFeatures.processed}
            className="prose max-w-none"
          />
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

      <CtaLinks primary={node.primaryCta} secondary={node.secondaryCta} />
    </article>
  )
}
