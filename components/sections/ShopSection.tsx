import { MediaFallback } from "@/components/ui/MediaFallback";
import { Ltr } from "@/components/ui/Ltr";
import { SectionHeading, SiteSection } from "@/components/ui/SiteSection";
import { ShopHours } from "@/components/sections/ShopHours";
import { assets } from "@/lib/assets";
import { t } from "@/lib/content";
import { telHref, whatsappHref } from "@/lib/format";

type ShopSectionProps = {
  titleAs?: "h1" | "h2";
};

export function ShopSection({ titleAs = "h2" }: ShopSectionProps) {
  return (
    <SiteSection id="contact">
      <SectionHeading eyebrow={t.shop.eyebrow} title={t.shop.title} titleAs={titleAs} />
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <dl className="space-y-6">
            <div>
              <dt className="text-sm text-muted">{t.shop.addressLabel}</dt>
              <dd>
                {t.site.mapUrl ? (
                  <a href={t.site.mapUrl} className="inline-flex min-h-11 items-center">
                    {t.site.address}
                  </a>
                ) : (
                  t.site.address
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">{t.shop.phoneLabel}</dt>
              <dd>
                <a href={telHref(t.site.phoneE164)} className="inline-flex min-h-11 items-center">
                  <Ltr>{t.site.phone}</Ltr>
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">{t.shop.whatsappLabel}</dt>
              <dd>
                <a href={whatsappHref(t.site.whatsapp)} className="inline-flex min-h-11 items-center">
                  <Ltr>{t.site.phone}</Ltr>
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-muted">{t.shop.parkingNote}</p>
          <div className="mt-8">
            <ShopHours />
          </div>
        </div>
        <MediaFallback
          src={assets.sections.storefront}
          alt={t.shop.storefrontAlt}
          slot="sections.storefront"
          expectedWidth={1600}
          expectedHeight={900}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="min-h-[16rem] w-full lg:min-h-[24rem]"
        />
      </div>
    </SiteSection>
  );
}
