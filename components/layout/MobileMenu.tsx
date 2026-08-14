"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { BookCta } from "@/components/ui/BookCta";
import { t } from "@/lib/content";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  menuId: string;
};

export function MobileMenu({ open, onClose, menuId }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = panel?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !focusables || focusables.length === 0) {
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[55] md:hidden" role="dialog" aria-modal="true" aria-labelledby={menuId}>
      <button
        type="button"
        className="absolute inset-0 bg-bg/80"
        aria-label={t.nav.closeLabel}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="absolute inset-y-0 start-0 flex w-[min(100%,24rem)] flex-col bg-bg px-6 py-8 shadow-premium"
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 id={menuId} className="font-display text-2xl font-extrabold">
            {t.nav.menuLabel}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center"
            aria-label={t.nav.closeLabel}
          >
            ×
          </button>
        </div>
        <nav aria-label={t.nav.menuLabel} className="flex flex-col gap-4">
          {t.nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="nav-type-mobile flex min-h-11 items-center"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <BookCta
          className="nav-type-mobile mt-8 inline-flex min-h-11 items-center justify-center bg-accent px-6 text-bg"
          onClick={onClose}
        >
          {t.nav.bookLabel}
        </BookCta>
      </div>
    </div>
  );
}
