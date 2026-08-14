import { BookCta } from "@/components/ui/BookCta";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { SectionHeading, SiteSection } from "@/components/ui/SiteSection";
import { teamMedia } from "@/lib/assets";
import { t } from "@/lib/content";

type TeamSectionProps = {
  titleAs?: "h1" | "h2";
};

export function TeamSection({ titleAs = "h2" }: TeamSectionProps) {
  return (
    <SiteSection id="team">
      <SectionHeading
        eyebrow={t.team.eyebrow}
        title={t.team.title}
        subtitle={t.team.subtitle}
        titleAs={titleAs}
      />
      <ul className="grid gap-8 md:grid-cols-3">
        {t.team.members.map((member) => (
          <li key={member.id} className="flex flex-col">
            <MediaFallback
              src={teamMedia(member.id)}
              alt={member.name}
              slot={`team.${member.id}`}
              expectedWidth={800}
              expectedHeight={1000}
              sizes="(min-width: 768px) 30vw, 100vw"
              className="aspect-[4/5] w-full"
            />
            <h3 className="mt-4 font-display text-[22px] font-extrabold">{member.name}</h3>
            <p className="text-sm text-muted">{member.role}</p>
            <p className="mt-3 text-sm text-muted">{member.bio}</p>
            {member.instagram ? (
              <a href={member.instagram} className="mt-3 inline-flex min-h-11 items-center text-sm">
                {t.footer.instagramLabel}
              </a>
            ) : null}
            <BookCta
              staffId={member.id}
              className="mt-4 inline-flex min-h-11 items-center text-accent"
            >
              {t.team.bookWithLabel} {member.name}
            </BookCta>
          </li>
        ))}
      </ul>
    </SiteSection>
  );
}
