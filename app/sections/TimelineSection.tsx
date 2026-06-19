import { motion } from "framer-motion";
import { SectionShell } from "~/components/SectionShell";
import { staggerChild, staggerParent } from "~/animations/variants";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";
import type { SectionProps } from "./types";

/** The milestones of our story, revealed down a vertical line on scroll. */
export function TimelineSection({ section }: SectionProps<"timeline">) {
  const reduced = usePrefersReducedMotion();
  const child = staggerChild(reduced);

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow}>
      <motion.ol
        className="relative ml-1 space-y-14 border-l border-white/10 pl-8"
        variants={staggerParent(0.18, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {section.entries.map((entry) => (
          <motion.li key={entry.id} variants={child} className="relative">
            <span
              aria-hidden
              className="absolute -left-[2.1rem] top-2 size-2 rounded-full bg-accent/70 ring-4 ring-bg"
            />
            {entry.date ? (
              <p className="text-caption uppercase tracking-widest text-secondary">
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
