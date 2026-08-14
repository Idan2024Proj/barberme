"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { t } from "@/lib/content";

const STORAGE_KEY = "announcement-dismissed-until";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!t.announcement.enabled) {
      return;
    }
    const until = Number(window.localStorage.getItem(STORAGE_KEY) ?? "0");
    if (!Number.isFinite(until) || Date.now() >= until) {
      setVisible(true);
    }
  }, []);

  if (!t.announcement.enabled || !visible) {
    return null;
  }

  function dismiss() {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now() + SEVEN_DAYS_MS));
    setVisible(false);
  }

  return (
    <div className="bg-accent text-bg">
      <div className="mx-auto flex max-w-[1536px] items-center justify-between gap-3 px-4 py-2 md:px-8">
        <p className="text-sm font-semibold md:text-base">
          {t.announcement.text}{" "}
          <Link href={t.announcement.ctaHref} className="underline underline-offset-4">
            {t.announcement.ctaLabel}
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-lg"
          aria-label={t.common.close}
        >
          ×
        </button>
      </div>
    </div>
  );
}
