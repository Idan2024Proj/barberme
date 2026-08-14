import { AboutSection } from "@/components/sections/AboutSection";
import { CtaBandSection } from "@/components/sections/CtaBandSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { GiftBannerSection } from "@/components/sections/GiftBannerSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MembershipSection } from "@/components/sections/MembershipSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ShopSection } from "@/components/sections/ShopSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <GallerySection />
      <GiftBannerSection />
      <TestimonialsSection />
      <MembershipSection />
      <CtaBandSection />
      <ShopSection />
    </>
  );
}
