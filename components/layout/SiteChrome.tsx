import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBookFab } from "@/components/layout/MobileBookFab";
import { SkipLink } from "@/components/ui/SkipLink";
import type { ReactNode } from "react";

type SiteChromeProps = {
  children: ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  return (
    <>
      <SkipLink />
      <div className="sticky top-0 z-50">
        <AnnouncementBar />
        <Header />
      </div>
      {children}
      <Footer />
      <MobileBookFab />
    </>
  );
}
