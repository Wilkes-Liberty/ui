import Image from "next/image"
import type { ParagraphLogoWall } from "@/types"

export function LogoWallParagraph({ data }: { data: ParagraphLogoWall }) {
  if (!data.logos?.length) return null
  return (
    <div className="my-8 grid grid-cols-3 md:grid-cols-5 gap-6 items-center">
      {data.logos.map((logo, i) =>
        logo?.url ? (
          <Image
            key={i}
            src={logo.url}
            width={logo.width || 120}
            height={logo.height || 60}
            alt={logo.alt ?? ""}
            className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100"
          />
        ) : null
      )}
    </div>
  )
}
