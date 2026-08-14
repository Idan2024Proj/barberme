import Link from "next/link";
import type { ReactNode } from "react";
import { bookingHref, type BookingContext } from "@/lib/booking";

type BookCtaProps = BookingContext & {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function BookCta({
  children,
  className,
  serviceId,
  staffId,
  onClick,
}: BookCtaProps) {
  return (
    <Link href={bookingHref({ serviceId, staffId })} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
