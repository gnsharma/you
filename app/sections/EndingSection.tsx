import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Confetti } from "~/components/Confetti";
import { StaggerLines } from "~/components/StaggerLines";
import { cx } from "~/utils/cx";
import type { SectionProps } from "./types";

/**
 * The closing chapter. When `invert` is set it flips to a light background —
 * the one moment the experience steps into the light. The optional
 * "one more thing" link is the doorway to the second experience.
 */
export function EndingSection({ section }: SectionProps<"ending">) {
  const invert = section.invert ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <section
      id={section.id}
      className={cx(
        "relative flex min-h-dvh flex-col items-center justify-center px-6 py-28 text-center sm:py-36",
        invert && "bg-primary text-bg",
      )}
    >
      <Confetti active={inView} />

      <div ref={ref} className="mx-auto w-full max-w-readable">
        <StaggerLines
          lines={section.body}
          className="space-y-3"
          lineClassName={invert ? "text-lead text-bg" : "text-lead text-primary"}
          stagger={0.22}
        />

        {section.oneMoreThing ? (
          <Link
            to={section.oneMoreThing.to}
            className={cx(
              "mt-20 inline-block text-caption uppercase tracking-[0.22em] transition-colors duration-500",
              invert
                ? "text-bg/40 hover:text-bg"
                : "text-secondary hover:text-primary",
            )}
          >
            {section.oneMoreThing.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
