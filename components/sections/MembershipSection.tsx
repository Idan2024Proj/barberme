import Link from "next/link";
import { SectionHeading, SiteSection } from "@/components/ui/SiteSection";
import { t } from "@/lib/content";

export function MembershipSection() {
  if (!t.membership.enabled) {
    return null;
  }

  return (
    <SiteSection id="membership" className="bg-surface">
      <SectionHeading
        eyebrow={t.membership.eyebrow}
        title={t.membership.title}
        subtitle={t.membership.body}
      />
      <ul className="grid gap-8 md:grid-cols-3">
        {t.membership.perks.map((perk) => (
          <li key={perk.title} className="border-t border-line pt-6">
            <h3 className="font-display text-[22px] font-extrabold">{perk.title}</h3>
            <p className="mt-3 text-muted">{perk.text}</p>
          </li>
        ))}
      </ul>
      <Link
        href={t.membership.ctaHref}
        className="mt-10 inline-flex min-h-12 items-center bg-accent px-8 text-bg"
      >
        {t.membership.ctaLabel}
      </Link>
    </SiteSection>
  );
}
