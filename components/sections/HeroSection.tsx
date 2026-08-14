import Link from "next/link";
import { BookCta } from "@/components/ui/BookCta";
import { HeroMedia } from "@/components/sections/HeroMedia";
import { t } from "@/lib/content";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <HeroMedia />
      <div className="absolute inset-0 bg-[color:var(--hero-overlay)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1536px] flex-col justify-end px-4 pb-16 pt-12 md:justify-center md:px-8 md:pb-24">
        <p className="mb-4 text-sm text-accent md:text-base">{t.hero.eyebrow}</p>
        <h1 className="max-w-5xl font-display text-[40px] font-extrabold md:text-[clamp(52px,8vw,108px)]">
          {t.hero.title}
        </h1>
        <p className="mt-6 max-w-xl text-fg/90">{t.hero.subtitle}</p>
        <div className="mt-8 flex flex-col gap-3 md:flex-row">
          <BookCta className="inline-flex min-h-12 items-center justify-center bg-accent px-8 text-bg">
            {t.hero.primaryCta}
          </BookCta>
          <Link
            href="/services"
            className="inline-flex min-h-12 items-center justify-center border border-line px-8"
          >
            {t.hero.secondaryCta}
          </Link>
        </div>
        <p className="mt-6 text-sm text-muted">{t.hero.footnote}</p>
        <a href="#about" className="mt-10 inline-flex min-h-11 items-center text-sm text-muted">
          {t.hero.scrollLabel}
        </a>
      </div>
    </section>
  );
}
