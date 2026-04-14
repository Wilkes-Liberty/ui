"use client"

import { useEffect, useState } from "react"

type Status = "idle" | "submitting" | "success" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [openedAt, setOpenedAt] = useState<number>(0)

  useEffect(() => {
    setOpenedAt(Date.now())
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setStatus("submitting")

    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      organization: String(fd.get("organization") ?? "").trim(),
      subject: String(fd.get("subject") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      _hp: String(fd.get("_hp") ?? ""),
      _t: openedAt,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok === false) {
        setError(data?.error || `Submission failed (${res.status})`)
        setStatus("error")
        return
      }
      setStatus("success")
      form.reset()
    } catch {
      setError("Network error. Please try again or email inquiry@wilkesliberty.com.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="contact-success">
        <div className="contact-success-mark">Transmission received.</div>
        <p>
          We have your message. Expect a response from{" "}
          <em>inquiry@wilkesliberty.com</em> within one business day.
        </p>
        <button
          type="button"
          className="contact-link"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      {/* Honeypot — hidden from humans, attractive to bots */}
      <input
        type="text"
        name="_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="contact-hp"
      />

      <div className="contact-row">
        <label className="contact-field">
          <span>Name</span>
          <input type="text" name="name" required maxLength={120} autoComplete="name" />
        </label>
        <label className="contact-field">
          <span>Email</span>
          <input type="email" name="email" required autoComplete="email" />
        </label>
      </div>

      <label className="contact-field">
        <span>Organization (optional)</span>
        <input type="text" name="organization" maxLength={200} autoComplete="organization" />
      </label>

      <label className="contact-field">
        <span>Subject</span>
        <input type="text" name="subject" required maxLength={200} />
      </label>

      <label className="contact-field">
        <span>Message</span>
        <textarea name="message" required rows={6} maxLength={5000} />
      </label>

      {error ? <div className="contact-error">{error}</div> : null}

      <button
        type="submit"
        className="contact-submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Transmitting…" : "Send"}
      </button>
    </form>
  )
}
