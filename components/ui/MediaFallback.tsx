"use client";

import Image from "next/image";
import { useState } from "react";
import { isAssetPath, type AssetPath } from "@/lib/assets";

type MediaFallbackProps = {
  src: AssetPath;
  alt: string;
  expectedWidth: number;
  expectedHeight: number;
  slot: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
};

export function MediaFallback({
  src,
  alt,
  expectedWidth,
  expectedHeight,
  slot,
  className = "",
  imageClassName = "object-cover",
  sizes,
  priority = false,
  fill = false,
}: MediaFallbackProps) {
  const [failed, setFailed] = useState(false);
  const usable = isAssetPath(src) && !failed;
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div
      className={`relative overflow-hidden bg-surface ${fill ? "h-full w-full" : ""} ${className}`}
      data-media-slot={isDev ? slot : undefined}
    >
      {usable ? (
        fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={imageClassName}
            onError={() => setFailed(true)}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={expectedWidth}
            height={expectedHeight}
            sizes={sizes}
            priority={priority}
            className={`h-full w-full ${imageClassName}`}
            onError={() => setFailed(true)}
          />
        )
      ) : (
        <div
          aria-hidden="true"
          className="flex h-full min-h-[12rem] w-full items-center justify-center border border-line bg-surface"
        >
          {isDev ? (
            <span className="px-3 text-center font-body text-xs tracking-normal text-muted">
              {slot} {expectedWidth}×{expectedHeight}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
