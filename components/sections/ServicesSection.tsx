import Link from "next/link";
import { BookCta } from "@/components/ui/BookCta";
import { Ltr } from "@/components/ui/Ltr";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { SectionHeading, SiteSection } from "@/components/ui/SiteSection";
import { serviceMedia } from "@/lib/assets";
import { t } from "@/lib/content";

type ServicesSectionProps = {
  showAllLink?: boolean;
  titleAs?: "h1" | "h2";
};

export function ServicesSection({ showAllLink = true, titleAs = "h2" }: ServicesSectionProps) {
  const items = t.services.items.filter((item) => item.active);

  return (
    <SiteSection id="services">
      <SectionHeading
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        subtitle={t.services.subtitle}
        titleAs={titleAs}
      />
      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col border border-line bg-surface">
            <MediaFallback
              src={serviceMedia(item.id)}
              alt={item.name}
              slot={`services.${item.id}`}
              expectedWidth={800}
              expectedHeight={1000}
              sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
              className="aspect-[4/5] w-full"
            />
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-[22px] font-extrabold">{item.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{item.description}</p>
              <p className="mt-4 text-sm">
                <Ltr>{item.duration}</Ltr> {t.services.durationSuffix}
                {" · "}
                <Ltr>
                  {item.price}
                  {t.services.currency}
                </Ltr>
              </p>
              <BookCta
                serviceId={item.id}
                className="mt-6 inline-flex min-h-11 items-center justify-center border border-accent px-4 text-sm text-accent"
              >
                {t.services.bookLabel}
              </BookCta>
            </div>
          </li>
        ))}
      </ul>
      {showAllLink ? (
        <div className="mt-10">
          <Link href="/services" className="inline-flex min-h-11 items-center text-accent">
            {t.services.allLabel}
          </Link>
        </div>
      ) : null}
    </SiteSection>
  );
}
