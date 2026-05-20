import type { DrupalParagraph } from "@/types"
import { HeroParagraph } from "./HeroParagraph"
import { TextBlockParagraph } from "./TextBlockParagraph"
import { NoticeParagraph } from "./NoticeParagraph"
import { CtaBannerParagraph } from "./CtaBannerParagraph"
import { CapabilityParagraph } from "./CapabilityParagraph"
import { UseCaseParagraph } from "./UseCaseParagraph"
import { OutcomeParagraph } from "./OutcomeParagraph"
import { FeatureParagraph } from "./FeatureParagraph"
import { StatParagraph } from "./StatParagraph"
import { TestimonialParagraph } from "./TestimonialParagraph"
import { TextImageParagraph } from "./TextImageParagraph"
import { ImageGalleryParagraph } from "./ImageGalleryParagraph"
import { LogoWallParagraph } from "./LogoWallParagraph"
import { FaqGroupParagraph } from "./FaqGroupParagraph"

/**
 * Switch-on-__typename paragraph renderer.
 * Returns null for paragraphs whose typename isn't recognized — keeps the
 * page from crashing if Drupal exposes a new paragraph bundle before the UI
 * has been updated.
 */
export function ParagraphRenderer({
  paragraph,
}: {
  paragraph: DrupalParagraph
}) {
  switch (paragraph.__typename) {
    case "ParagraphPHero":
      return <HeroParagraph data={paragraph} />
    case "ParagraphPTextBlock":
      return <TextBlockParagraph data={paragraph} />
    case "ParagraphPNotice":
      return <NoticeParagraph data={paragraph} />
    case "ParagraphPCtaBanner":
      return <CtaBannerParagraph data={paragraph} />
    case "ParagraphCapability":
      return <CapabilityParagraph data={paragraph} />
    case "ParagraphUseCase":
      return <UseCaseParagraph data={paragraph} />
    case "ParagraphOutcome":
      return <OutcomeParagraph data={paragraph} />
    case "ParagraphPFeature":
      return <FeatureParagraph data={paragraph} />
    case "ParagraphPStat":
      return <StatParagraph data={paragraph} />
    case "ParagraphPTestimonial":
      return <TestimonialParagraph data={paragraph} />
    case "ParagraphPTextImage":
      return <TextImageParagraph data={paragraph} />
    case "ParagraphPImageGallery":
      return <ImageGalleryParagraph data={paragraph} />
    case "ParagraphPLogoWall":
      return <LogoWallParagraph data={paragraph} />
    case "ParagraphPFaqGroup":
      return <FaqGroupParagraph data={paragraph} />
    default:
      return null
  }
}
