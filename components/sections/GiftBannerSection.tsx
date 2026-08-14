import Link from "next/link";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { assets } from "@/lib/assets";
import { t } from "@/lib/content";

type GiftBannerSectionProps = {
  titleAs?: "h1" | "h2";
};

export function GiftBannerSection({ titleAs = "h2" }: GiftBannerSectionProps) {
  if (!t.giftBanner.enabled) {
    return null;
  }

  const TitleTag = titleAs;

  return (
    <section id="gift" className="relative isolate overflow-hidden py-[72px] md:py-[128px]">
      <div className="absolute inset-0">
        <MediaFallback
          src={assets.sections.gift}
          alt={t.giftBanner.imageAlt}
          slot="sections.gift"
          expectedWidth={2400}
          expectedHeight={1200}
          fill
          sizes="100vw"
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-bg/70" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-[1536px] px-4 md:px-8">
        <TitleTag className="max-w-3xl font-display text-[30px] font-extrabold md:text-[clamp(34px,4.5vw,60px)]">
          {t.giftBanner.title}
        </TitleTag>
        <p className="mt-4 max-w-xl text-muted">{t.giftBanner.text}</p>
        <Link
          href={t.giftBanner.ctaHref}
          className="mt-8 inline-flex min-h-12 items-center bg-accent px-8 text-bg"
        >
          {t.giftBanner.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
