import type { ReactNode } from "react";

type LtrProps = {
  children: ReactNode;
  className?: string;
};

export function Ltr({ children, className }: LtrProps) {
  return (
    <bdi dir="ltr" className={className}>
      {children}
    </bdi>
  );
}
