import type { ReactNode } from "react";
import { SiteSection } from "@/components/ui/SiteSection";

type InnerPageProps = {
  title: string;
  children?: ReactNode;
};

export function InnerPage({ title, children }: InnerPageProps) {
  return (
    <SiteSection>
      <h1 className="mb-10 font-display text-[40px] font-extrabold md:text-[clamp(34px,4.5vw,60px)]">
        {title}
      </h1>
      {children}
    </SiteSection>
  );
}
