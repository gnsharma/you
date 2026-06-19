import type { ReactNode } from "react";
import { cx } from "~/utils/cx";

/** Small, spaced, uppercased label that introduces a chapter. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cx("text-eyebrow uppercase text-secondary", className)}>
      {children}
    </p>
  );
}
