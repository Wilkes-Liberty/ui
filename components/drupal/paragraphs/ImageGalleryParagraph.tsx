import Image from "next/image"
import type { ParagraphImageGallery } from "@/types"

export function ImageGalleryParagraph({
  data,
}: {
  data: ParagraphImageGallery
}) {
  if (!data.galleryImages?.length) return null
  return (
    <section className="my-8">
      {data.title ? (
        <h3 className="mb-4 text-2xl font-bold">{data.title}</h3>
      ) : null}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.galleryImages.map((img, i) =>
          img?.url ? (
            <figure key={i}>
              <Image
                src={img.url}
                width={img.width || 400}
                height={img.height || 300}
                alt={img.alt ?? ""}
                className="rounded"
              />
            </figure>
          ) : null
        )}
      </div>
    </section>
  )
}
