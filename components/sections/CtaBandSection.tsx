import { BookCta } from "@/components/ui/BookCta";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { assets } from "@/lib/assets";
import { t } from "@/lib/content";

export function CtaBandSection() {
  return (
    <section className="relative isolate overflow-hidden py-[72px] md:py-[128px]">
      <div className="absolute inset-0">
        <MediaFallback
          src={assets.sections.cta}
          alt={t.ctaBand.imageAlt}
          slot="sections.cta"
          expectedWidth={2400}
          expectedHeight={1000}
          fill
          sizes="100vw"
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-bg/75" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-[1536px] px-4 text-center md:px-8">
        <h2 className="font-display text-[30px] font-extrabold md:text-[clamp(34px,4.5vw,60px)]">
          {t.ctaBand.title}
        </h2>
        <p className="mt-4 text-muted">{t.ctaBand.subtitle}</p>
        <BookCta className="mt-8 inline-flex min-h-12 items-center bg-accent px-8 text-bg">
          {t.ctaBand.ctaLabel}
        </BookCta>
      </div>
    </section>
  );
}
