import { motion, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

/** A hairline scroll-progress indicator pinned to the top of the viewport. */
export function ProgressBar() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });
  const scaleX = reduced ? scrollYProgress : smooth;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-40 h-px origin-left bg-accent/55"
      style={{ scaleX }}
    />
  );
}
