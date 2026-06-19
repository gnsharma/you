import { motion } from "framer-motion";
import { useMemo, type ReactNode } from "react";
import type { AnimationKind } from "~/content/types";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";
import { DURATION, revealVariants } from "~/animations/variants";

interface RevealProps {
  kind?: AnimationKind;
  duration?: number;
  delay?: number;
  /** Fraction of the element that must be visible before it reveals. */
  amount?: number;
  once?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Reveals its children once they scroll into view, using the calm enter
 * animation for the given kind. Honors reduced-motion automatically.
 */
export function Reveal({
  kind = "fade",
  duration,
  delay = 0,
  amount = 0.35,
  once = true,
  className,
  children,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const variants = useMemo(
    () => revealVariants(kind, duration ?? DURATION.base, delay, reduced),
    [kind, duration, delay, reduced],
  );

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}
