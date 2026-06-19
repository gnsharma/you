import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { SectionShell } from "~/components/SectionShell";
import { staggerChild, staggerParent } from "~/animations/variants";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";
import type { SectionProps } from "./types";

/**
 * The milestones of our story. A faint track runs down the left; an accent
 * line fills it as the chapter scrolls past — time, passing. Each milestone
 * fades up in turn.
 */
export function TimelineSection({ section }: SectionProps<"timeline">) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 80%"],
  });
  const child = staggerChild(reduced);

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow}>
      <motion.ol
        ref={ref}
        className="relative ml-1 space-y-14 pl-8"
        variants={staggerParent(0.18, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* dim track */}
        <span
          aria-hidden
          className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-white/10"
        />
        {/* accent fill, driven by scroll */}
        <motion.span
          aria-hidden
          className="absolute left-0 top-1 w-px origin-top bg-accent/60"
          style={{
            height: "calc(100% - 0.5rem)",
            scaleY: reduced ? 1 : scrollYProgress,
          }}
        />

        {section.entries.map((entry) => (
          <motion.li key={entry.id} variants={child} className="relative">
            <span
              aria-hidden
              className="absolute -left-[2.1rem] top-2 size-2 rounded-full bg-accent ring-4 ring-bg"
            />
            {entry.date ? (
              <p className="text-caption uppercase tracking-[0.18em] text-secondary">
                {entry.date}
              </p>
            ) : null}
            <p className="mt-1 text-2xl font-medium tracking-tight sm:text-3xl">
              {entry.label}
            </p>
            {entry.detail ? (
              <p className="mt-3 max-w-md text-body text-secondary">
                {entry.detail}
              </p>
            ) : null}
          </motion.li>
        ))}
      </motion.ol>
    </SectionShell>
  );
}
