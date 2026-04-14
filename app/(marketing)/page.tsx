import type { Metadata } from "next"
import { StatusIndicators } from "@/components/landing/StatusIndicators"
import "./landing.css"

export const metadata: Metadata = {
  title: "Wilkes & Liberty",
  description:
    "Sovereign infrastructure for defense, intelligence, and critical infrastructure.",
  robots: {
    index: false,
    follow: false,
  },
}

// Static — no Drupal dependency, always renders even if backend is down.
export const dynamic = "force-static"

export default function LandingPage() {
  return (
    <>
      <nav className="landing-nav">
        <a href="https://api.wilkesliberty.com/user/login">Admin</a>
      </nav>
      <div className="landing-grain" />
      <div className="landing-glow" />
      <div className="landing-line-l" />
      <div className="landing-line-r" />
      <div className="landing-shell">
        <div className="landing-content">
          <div className="landing-mark">Wilkes &amp; Liberty</div>
          <h1 className="landing-h1">
            Building what <em>cannot be compromised.</em>
          </h1>
          <div className="landing-sub">
            Sovereign infrastructure for sovereign missions.
          </div>
          <div className="landing-divider" />
          <p className="landing-p">
            Private platforms for defense, intelligence, and critical
            infrastructure. Engineered for organizations where failure is not
            an abstraction.
          </p>
          <div className="landing-closed">
            <div className="landing-closed-dot" />
            Not accepting new clients
          </div>
          <div className="landing-contact">
            <a href="mailto:inquiry@wilkesliberty.com">
              inquiry@wilkesliberty.com
            </a>
          </div>
        </div>
      </div>
      <div className="landing-footer">
        Washington, DC &nbsp;&middot;&nbsp; Palm Beach, FL
      </div>
      <StatusIndicators />
    </>
  )
}
