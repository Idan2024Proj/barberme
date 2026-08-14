"use client";

import Image from "next/image";
import { isAssetPath, type AssetPath } from "@/lib/assets";
import { MediaFallback } from "@/components/ui/MediaFallback";

type BrandLogoProps = {
  src: AssetPath;
  alt: string;
  className?: string;
};

export function BrandLogo({ src, alt, className = "" }: BrandLogoProps) {
  if (!isAssetPath(src)) {
    return (
      <MediaFallback
        src={src}
        alt={alt}
        slot="branding.logo"
        expectedWidth={160}
        expectedHeight={48}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={200}
      height={64}
      className={`h-10 w-auto object-contain ${className}`}
      priority
    />
  );
}
