import type { ParagraphHero } from "@/types"

/**
 * Hero paragraph — large headline + subline + divider.
 *
 * heroTitle is a plain string (Drupal `string` field), rendered as text.
 * subtitle.processed comes from Drupal's text format pipeline, which
 * applies the configured filters (escape HTML / allow whitelisted tags
 * via the "Headless Clean" or "Plain Text" formats). Drupal sanitizes
 * the markup before returning it via GraphQL, so it is safe to render.
 */
export function HeroParagraph({ data }: { data: ParagraphHero }) {
  const title = data.heroTitle ?? ""
  const subtitleHtml = data.subtitle?.processed

  return (
    <>
      {title ? <h1 className="landing-h1">{title}</h1> : null}
      {subtitleHtml ? (
        <div
          className="landing-sub"
          // Drupal-filtered HTML — already sanitized by the text format pipeline.
          dangerouslySetInnerHTML={{ __html: subtitleHtml }}
        />
      ) : null}
      <div className="landing-divider" />
    </>
  )
}
