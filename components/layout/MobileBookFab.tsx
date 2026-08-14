import { BookCta } from "@/components/ui/BookCta";
import { t } from "@/lib/content";

export function MobileBookFab() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden">
      <BookCta className="pointer-events-auto flex min-h-12 w-full items-center justify-center bg-accent text-bg shadow-premium">
        {t.nav.bookLabel}
      </BookCta>
    </div>
  );
}
