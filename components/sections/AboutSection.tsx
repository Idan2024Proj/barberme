import { MediaFallback } from "@/components/ui/MediaFallback";
import { SectionHeading, SiteSection } from "@/components/ui/SiteSection";
import { assets } from "@/lib/assets";
import { t } from "@/lib/content";

export function AboutSection() {
  return (
    <SiteSection id="about">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
          <p className="text-muted">{t.about.body}</p>
        </div>
        <MediaFallback
          src={assets.about.main}
          alt={t.about.imageAlt}
          slot="about.main"
          expectedWidth={1200}
          expectedHeight={1400}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="min-h-[22rem] w-full lg:min-h-[36rem]"
          imageClassName="object-cover"
        />
      </div>
      <ul className="mt-16 grid gap-8 md:grid-cols-3">
        {t.about.values.map((value) => (
          <li key={value.title} className="border-t border-line pt-6">
            <h3 className="font-display text-[22px] font-extrabold md:text-[26px]">{value.title}</h3>
            <p className="mt-3 text-muted">{value.text}</p>
          </li>
        ))}
      </ul>
    </SiteSection>
  );
}
