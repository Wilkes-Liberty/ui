import type { Metadata } from "next"
import Link from "next/link"
import { ContactForm } from "@/components/landing/ContactForm"
import "../landing.css"
import "./contact.css"

export const metadata: Metadata = {
  title: "Contact — Wilkes & Liberty",
  description:
    "Reach out about engagements, partnerships, or inquiries. We respond from inquiry@wilkesliberty.com.",
  robots: { index: false, follow: false },
}

export const dynamic = "force-static"

export default function ContactPage() {
  return (
    <>
      <nav className="landing-nav">
        <Link href="/">Home</Link>
      </nav>
      <div className="landing-grain" />
      <div className="landing-glow" />
      <div className="landing-line-l" />
      <div className="landing-line-r" />
      <div className="contact-shell">
        <div className="contact-content">
          <div className="landing-mark">Wilkes &amp; Liberty</div>
          <h1 className="landing-h1">
            Begin a <em>conversation.</em>
          </h1>
          <div className="landing-sub">
            We respond personally, on our own infrastructure, within one
            business day.
          </div>
          <div className="landing-divider" />
          <ContactForm />
          <div className="contact-footer">
            <a href="mailto:inquiry@wilkesliberty.com">inquiry@wilkesliberty.com</a>
          </div>
        </div>
      </div>
    </>
  )
}
