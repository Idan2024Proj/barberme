import { t } from "@/lib/content";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-3 focus:text-bg"
    >
      {t.common.skipToContent}
    </a>
  );
}
