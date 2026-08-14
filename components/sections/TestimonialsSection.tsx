import { Ltr } from "@/components/ui/Ltr";
import { SectionHeading, SiteSection } from "@/components/ui/SiteSection";
import { t } from "@/lib/content";
import { initialsFromName } from "@/lib/format";

export function TestimonialsSection() {
  return (
    <SiteSection id="testimonials">
      <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
      <p className="mb-10 text-lg">
        <Ltr>{t.testimonials.ratingValue}</Ltr>
        {" / "}
        <Ltr>{t.testimonials.ratingMax}</Ltr>
        {" · "}
        {t.testimonials.ratingText}
      </p>
      <a href={t.testimonials.reviewsLink} className="mb-10 inline-flex min-h-11 items-center text-accent">
        {t.testimonials.reviewsLinkLabel}
      </a>
      <ul className="grid gap-6 md:grid-cols-3">
        {t.testimonials.items.map((item) => (
          <li key={item.quote} className="border border-line bg-surface p-6">
            <div
              aria-hidden="true"
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-sm font-bold text-bg"
            >
              {initialsFromName(item.name)}
            </div>
            <blockquote className="text-fg">
              <p>{item.quote}</p>
              <footer className="mt-4 text-sm text-muted">{item.name}</footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </SiteSection>
  );
}
