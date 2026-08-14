import { MediaFallback } from "@/components/ui/MediaFallback";
import { SectionHeading, SiteSection } from "@/components/ui/SiteSection";
import { assets } from "@/lib/assets";
import { t } from "@/lib/content";

type GallerySectionProps = {
  titleAs?: "h1" | "h2";
};

export function GallerySection({ titleAs = "h2" }: GallerySectionProps) {
  const items = assets.gallery.map((src, index) => ({
    src,
    alt: t.gallery.images[index]?.alt ?? t.gallery.fallbackAlt,
  }));

  return (
    <SiteSection id="gallery">
      <SectionHeading
        eyebrow={t.gallery.eyebrow}
        title={t.gallery.title}
        subtitle={t.gallery.subtitle}
        titleAs={titleAs}
      />
      {items.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.src}>
              <MediaFallback
                src={item.src}
                alt={item.alt}
                slot="gallery"
                expectedWidth={1200}
                expectedHeight={1200}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="aspect-square w-full"
              />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index}>
              <MediaFallback
                src={null}
                alt=""
                slot="gallery"
                expectedWidth={1200}
                expectedHeight={1200}
                className="aspect-square w-full"
              />
            </li>
          ))}
        </ul>
      )}
    </SiteSection>
  );
}
