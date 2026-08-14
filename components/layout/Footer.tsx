import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { assets } from "@/lib/assets";
import { t } from "@/lib/content";
import { interpolate } from "@/lib/format";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg pb-28 md:pb-0">
      <div className="mx-auto grid max-w-[1536px] gap-12 px-4 py-[72px] md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <BrandLogo src={assets.branding.logo} alt={t.nav.logoAlt} />
          <p className="mt-4 max-w-sm text-sm text-muted">{t.footer.about}</p>
        </div>
        {t.footer.columns.map((column) => (
          <div key={column.title}>
            <h2 className="mb-4 font-display text-lg font-extrabold">{column.title}</h2>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-11 items-center text-sm text-muted">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1536px] flex-col gap-4 border-t border-line px-4 py-6 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-sm text-muted">{interpolate(t.footer.copyright, { year, shopName: t.site.name })}</p>
        <nav aria-label={t.footer.socialLabel} className="flex flex-wrap gap-4">
          {t.site.instagram ? (
            <a href={t.site.instagram} className="inline-flex min-h-11 items-center text-sm">
              {t.footer.instagramLabel}
            </a>
          ) : null}
          {t.site.facebook ? (
            <a href={t.site.facebook} className="inline-flex min-h-11 items-center text-sm">
              {t.footer.facebookLabel}
            </a>
          ) : null}
          {t.site.tiktok ? (
            <a href={t.site.tiktok} className="inline-flex min-h-11 items-center text-sm">
              {t.footer.tiktokLabel}
            </a>
          ) : null}
        </nav>
      </div>
    </footer>
  );
}
