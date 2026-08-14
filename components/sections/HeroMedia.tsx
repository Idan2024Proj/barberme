"use client";

import { useEffect, useState } from "react";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { assets, isAssetPath } from "@/lib/assets";
import { t } from "@/lib/content";

export function HeroMedia() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    function sync() {
      setReduceMotion(media.matches);
    }
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const fallbackImage = isAssetPath(assets.hero.poster)
    ? assets.hero.poster
    : assets.hero.mobile;
  const showVideo = isAssetPath(assets.hero.video) && !reduceMotion;

  return (
    <>
      {showVideo ? (
        <video
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={assets.hero.video} type="video/mp4" />
        </video>
      ) : null}

      <div className={showVideo ? "absolute inset-0 md:hidden" : "absolute inset-0"}>
        <MediaFallback
          src={fallbackImage}
          alt={t.hero.videoAlt}
          slot="hero.mobile"
          expectedWidth={1080}
          expectedHeight={1920}
          fill
          priority
          sizes="100vw"
          className="h-full w-full"
          imageClassName="object-cover"
        />
      </div>
    </>
  );
}
