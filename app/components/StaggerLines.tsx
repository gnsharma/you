import { motion } from "framer-motion";
import { staggerChild, staggerParent } from "~/animations/variants";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";
import { cx } from "~/utils/cx";

interface StaggerLinesProps {
  lines: string[];
  className?: string;
  /** Class applied to each line (set the type scale and color here). */
  lineClassName?: string;
  stagger?: number;
  amount?: number;
}

/**
 * Reveals a list of lines one after another as the block enters view — the
 * "one sentence at a time" rhythm used by the text and ending chapters.
 * Each line preserves intentional "\n" breaks.
 */
export function StaggerLines({
  lines,
  className,
  lineClassName = "text-lead text-primary",
  stagger = 0.16,
  amount = 0.4,
}: StaggerLinesProps) {
  const reduced = usePrefersReducedMotion();
  const child = staggerChild(reduced);

  return (
    <motion.div
      className={className}
      variants={staggerParent(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {lines.map((line, i) => (
        <motion.p
          key={i}
          variants={child}
          className={cx("whitespace-pre-line text-balance", lineClassName)}
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
}
