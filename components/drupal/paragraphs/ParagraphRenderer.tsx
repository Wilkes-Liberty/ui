import type { DrupalParagraph } from "@/types"
import { HeroParagraph } from "./HeroParagraph"
import { TextBlockParagraph } from "./TextBlockParagraph"
import { NoticeParagraph } from "./NoticeParagraph"
import { CtaBannerParagraph } from "./CtaBannerParagraph"

/**
 * Switch-on-__typename paragraph renderer.
 * Add new paragraph types here as they become editable from Drupal.
 */
export function ParagraphRenderer({ paragraph }: { paragraph: DrupalParagraph }) {
  switch (paragraph.__typename) {
    case "ParagraphPHero":
      return <HeroParagraph data={paragraph} />
    case "ParagraphPTextBlock":
      return <TextBlockParagraph data={paragraph} />
    case "ParagraphPNotice":
      return <NoticeParagraph data={paragraph} />
    case "ParagraphPCtaBanner":
      return <CtaBannerParagraph data={paragraph} />
    default:
      return null
  }
}
