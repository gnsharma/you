import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

/**
 * A faint hint to keep scrolling, pinned near the bottom of the hero. The
 * chevron drifts slowly — a breath, not a bounce — and holds still under
 * reduced motion.
 */
export function ContinueIndicator({ label }: { label?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-secondary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 1.4 }}
    >
      {label ? (
        <span className="text-caption uppercase tracking-[0.22em]">{label}</span>
      ) : null}
      <motion.span
        animate={reduced ? undefined : { y: [0, 7, 0] }}
        transition={
          reduced
            ? undefined
            : { duration: 2.6, ease: "easeInOut", repeat: Infinity }
        }
      >
        <ChevronDown className="size-4" strokeWidth={1.5} />
      </motion.span>
    </motion.div>
  );
}
