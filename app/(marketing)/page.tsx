import type { Metadata } from "next"
import { StatusIndicators } from "@/components/landing/StatusIndicators"
import { ParagraphRenderer } from "@/components/drupal/paragraphs/ParagraphRenderer"
import { getHomepage } from "@/lib/queries/homepage"
import type { DrupalParagraph } from "@/types"
import "./landing.css"

export const metadata: Metadata = {
  title: "Wilkes & Liberty",
  description:
    "Sovereign infrastructure for defense, intelligence, and critical infrastructure.",
  robots: { index: false, follow: false },
}

// ISR backup — revalidate the cached page every 30s if Drupal hasn't
// triggered an on-demand revalidation via /api/revalidate. The webhook
// (configured in Drupal's next_entity_type_config) is the primary
// refresh mechanism; this is a safety net for edge cases (webhook fails,
// Drupal restarts mid-save, etc.).
export const revalidate = 30

// Hardcoded fallback shown when Drupal is unreachable. Mirrors the seed
// content in webcms/scripts/setup_homepage.php so the visual stays identical.
const FALLBACK: DrupalParagraph[] = [
  {
    __typename: "ParagraphPHero",
    heroTitle: "Building what cannot be compromised.",
    subtitle: { processed: "Sovereign infrastructure for sovereign missions." },
  },
  {
    __typename: "ParagraphPTextBlock",
    body: {
      processed:
        "Private platforms for defense, intelligence, and critical infrastructure. Engineered for organizations where failure is not an abstraction.",
    },
  },
  {
    __typename: "ParagraphPNotice",
    noticeTitle: "Not accepting new clients",
    noticeTone: "warning",
  },
  {
    __typename: "ParagraphPCtaBanner",
    ctaLinks: [
      {
        url: "mailto:inquiry@wilkesliberty.com",
        title: "inquiry@wilkesliberty.com",
      },
    ],
  },
]

export default async function LandingPage() {
  const homepage = await getHomepage()
  const components = homepage?.components ?? FALLBACK

  return (
    <>

      <div className="landing-grain" />
      <div className="landing-glow" />
      <div className="landing-line-l" />
      <div className="landing-line-r" />
      <div className="landing-shell">
        <div className="landing-content">
          <div className="landing-mark">Wilkes &amp; Liberty</div>
          {components.map((paragraph, i) => (
            <ParagraphRenderer key={i} paragraph={paragraph} />
          ))}
        </div>
      </div>
      <div className="landing-footer">
        Washington, DC &nbsp;&middot;&nbsp; Palm Beach, FL
      </div>
      <StatusIndicators />
    </>
  )
}
