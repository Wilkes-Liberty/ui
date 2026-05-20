import Image from "next/image"
import { RawHtml } from "@/components/drupal/shared/RawHtml"
import { mediaToImage } from "@/lib/drupal-media"
import type { ParagraphTextImage } from "@/types"

export function TextImageParagraph({ data }: { data: ParagraphTextImage }) {
  const body = data.body?.processed
  const media = mediaToImage(data.media)
  if (!data.title && !body && !media?.url) return null
  return (
    <div className="my-8 grid gap-6 md:grid-cols-2 items-center">
      <div>
        {data.title ? (
          <h3 className="mb-3 text-2xl font-bold">{data.title}</h3>
        ) : null}
        <RawHtml html={body} className="prose max-w-none" />
      </div>
      {media?.url ? (
        <figure>
          <Image
            src={media.url}
            width={media.width || 640}
            height={media.height || 480}
            alt={media.alt ?? ""}
            className="rounded-lg"
          />
        </figure>
      ) : null}
    </div>
  )
}
