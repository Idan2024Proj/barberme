"use client";

import { useEffect, useState } from "react";
import { t } from "@/lib/content";
import { getShopHoursState } from "@/lib/hours";
import { Ltr } from "@/components/ui/Ltr";

export function ShopHours() {
  const [state, setState] = useState(() => getShopHoursState(t.shop.hours));

  useEffect(() => {
    setState(getShopHoursState(t.shop.hours));
  }, []);

  const statusLabel = state.isOpen ? t.shop.openNow : t.shop.closedNow;

  return (
    <div>
      <div className="mb-4 inline-flex min-h-11 items-center border border-line px-3 text-sm">
        {statusLabel}
      </div>
      <h3 className="mb-3 font-display text-lg font-extrabold">{t.shop.hoursLabel}</h3>
      <ul>
        {t.shop.hours.map((row, index) => {
          const isToday = index === state.dayIndex;
          return (
            <li
              key={row.day}
              className={`flex min-h-11 items-center justify-between gap-4 border-b border-line py-2 text-sm ${
                isToday ? "text-accent" : "text-muted"
              }`}
              aria-current={isToday ? "date" : undefined}
            >
              <span>{row.day}</span>
              {row.closed ? (
                <span>{t.shop.closedLabel}</span>
              ) : (
                <Ltr>
                  {row.open}–{row.close}
                </Ltr>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
