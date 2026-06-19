import type { ReactNode } from "react";
import { cx } from "~/utils/cx";
import { Eyebrow } from "./Eyebrow";

interface SectionShellProps {
  id: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  /** Max-width of the content column. Headings go wider than body copy. */
  contentWidth?: string;
  /** Extra classes for the content wrapper (e.g. alignment). */
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
  contentWidth = "max-w-readable",
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
      <div className={cx("mx-auto w-full", contentWidth, contentClassName)}>
        {eyebrow ? <Eyebrow className="mb-10">{eyebrow}</Eyebrow> : null}
        {children}
      </div>
    </section>
  );
}
