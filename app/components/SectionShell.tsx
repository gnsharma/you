import type { ReactNode } from "react";
import { cx } from "~/utils/cx";
import { Eyebrow } from "./Eyebrow";

interface SectionShellProps {
  id: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  /** Overrides the inner content wrapper (default: centered readable column). */
  contentClassName?: string;
  /** Fill at least one viewport height and vertically center (default true). */
  full?: boolean;
}

/**
 * The frame every chapter sits in: at least one viewport tall, generously
 * padded, content held to a readable measure. Sections override the inner
 * width (e.g. photos go wider) via `contentClassName`.
 */
export function SectionShell({
  id,
  eyebrow,
  children,
  className,
  contentClassName,
  full = true,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cx(
        "relative w-full px-6 py-28 sm:px-8 sm:py-36",
        full && "flex min-h-dvh flex-col justify-center",
        className,
      )}
    >
      <div className={cx("mx-auto w-full max-w-readable", contentClassName)}>
        {eyebrow ? <Eyebrow className="mb-10">{eyebrow}</Eyebrow> : null}
        {children}
      </div>
    </section>
  );
}
