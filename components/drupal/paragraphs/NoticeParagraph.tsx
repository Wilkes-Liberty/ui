import type { ParagraphNotice } from "@/types"

const TONE_CLASS: Record<ParagraphNotice["noticeTone"], string> = {
  success: "landing-closed-dot landing-closed-dot--success",
  warning: "landing-closed-dot",
  info: "landing-closed-dot landing-closed-dot--info",
  danger: "landing-closed-dot landing-closed-dot--danger",
}

/**
 * Notice paragraph — the dark pill with a colored pulse dot.
 * Used for "Not accepting new clients", "Now hiring", etc.
 */
export function NoticeParagraph({ data }: { data: ParagraphNotice }) {
  const dotClass = TONE_CLASS[data.noticeTone] ?? TONE_CLASS.warning
  return (
    <div className="landing-closed">
      <div className={dotClass} />
      {data.noticeTitle}
    </div>
  )
}
