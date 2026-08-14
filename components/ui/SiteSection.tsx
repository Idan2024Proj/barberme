import type { ReactNode } from "react";

type SiteSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  contained?: boolean;
};

export function SiteSection({
  id,
  children,
  className = "",
  contained = true,
}: SiteSectionProps) {
  return (
    <section id={id} className={`py-[72px] md:py-[128px] ${className}`}>
      {contained ? (
        <div className="mx-auto w-full max-w-[1536px] px-4 md:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  titleAs?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  titleAs = "h2",
}: SectionHeadingProps) {
  const TitleTag = titleAs;
  return (
    <div className="mb-10 max-w-3xl md:mb-14">
      {eyebrow ? <p className="mb-3 text-sm text-accent">{eyebrow}</p> : null}
      <TitleTag className="font-display text-[30px] font-extrabold md:text-[clamp(34px,4.5vw,60px)]">
        {title}
      </TitleTag>
      {subtitle ? <p className="mt-4 text-muted">{subtitle}</p> : null}
    </div>
  );
}
