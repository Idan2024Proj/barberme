import Link from "next/link";
import { BookCta } from "@/components/ui/BookCta";
import { InnerPage } from "@/components/ui/InnerPage";
import { t } from "@/lib/content";

export default function NotFound() {
  return (
    <InnerPage title={t.common.notFoundTitle}>
      <p className="text-muted">{t.common.notFoundText}</p>
      <div className="mt-8 flex flex-col gap-3 md:flex-row">
        <Link href="/" className="inline-flex min-h-11 items-center text-accent">
          {t.common.backHome}
        </Link>
        <BookCta className="inline-flex min-h-11 items-center bg-accent px-6 text-bg">
          {t.nav.bookLabel}
        </BookCta>
      </div>
    </InnerPage>
  );
}
