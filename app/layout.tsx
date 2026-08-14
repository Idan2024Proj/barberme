import type { Metadata } from "next";
import { Assistant, Heebo } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { assets } from "@/lib/assets";
import { t } from "@/lib/content";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["500", "700", "800", "900"],
  display: "swap",
  variable: "--font-display",
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: t.seo.title,
  description: t.seo.description,
  icons: assets.branding.favicon
    ? {
        icon: assets.branding.favicon,
        apple: assets.branding.appleTouchIcon ?? assets.branding.favicon,
      }
    : undefined,
  openGraph: {
    title: t.seo.title,
    description: t.seo.description,
    locale: "he_IL",
    type: "website",
    images: assets.seo.ogImage
      ? [{ url: assets.seo.ogImage, alt: t.seo.ogImageAlt }]
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${assistant.variable}`}
    >
      <body className="bg-bg font-body text-fg antialiased">
        <MotionProvider>
          <SiteChrome>
            <main id="main-content">{children}</main>
          </SiteChrome>
        </MotionProvider>
      </body>
    </html>
  );
}
