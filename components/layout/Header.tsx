"use client";

import { useState } from "react";
import Link from "next/link";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { BookCta } from "@/components/ui/BookCta";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { assets } from "@/lib/assets";
import { t } from "@/lib/content";

const MENU_ID = "mobile-nav-title";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-bg/90">
      <div className="mx-auto grid h-[72px] max-w-[1536px] grid-cols-[1fr_auto] items-center gap-4 px-4 md:h-20 md:px-8 lg:grid-cols-3">
        <Link href="/" className="inline-flex min-h-11 items-center justify-self-start">
          <BrandLogo src={assets.branding.logo} alt={t.nav.logoAlt} />
        </Link>

        <nav className="hidden items-center justify-center gap-8 lg:flex" aria-label={t.nav.menuLabel}>
          {t.nav.items.map((item) => (
            <Link key={item.href} href={item.href} className="nav-type inline-flex min-h-11 items-center">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <BookCta className="nav-type hidden min-h-11 items-center bg-accent px-5 text-bg md:inline-flex">
            {t.nav.bookLabel}
          </BookCta>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t.nav.menuLabel}
            onClick={() => setMenuOpen(true)}
          >
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span className="block h-px w-6 bg-fg" />
              <span className="block h-px w-6 bg-fg" />
              <span className="block h-px w-6 bg-fg" />
            </span>
          </button>
        </div>
      </div>
      <div id="mobile-menu">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} menuId={MENU_ID} />
      </div>
    </header>
  );
}
