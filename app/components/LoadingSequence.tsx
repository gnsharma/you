import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_CALM } from "~/animations/variants";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

/**
 * A quiet opening veil: a single breathing accent dot over black that lifts
 * once fonts are ready (and a short minimum has passed, to avoid a flash).
 */
export function LoadingSequence() {
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const minimum = new Promise<void>((resolve) =>
      setTimeout(resolve, reduced ? 150 : 850),
    );
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();

    Promise.all([fonts, minimum]).then(() => {
      if (!cancelled) setDone(true);
    });

    return () => {
      cancelled = true;
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {done ? null : (
        <motion.div
          key="loading"
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE_CALM }}
        >
          <motion.span
            className="size-1.5 rounded-full bg-accent"
            animate={
              reduced ? undefined : { opacity: [0.25, 1, 0.25], scale: [1, 1.4, 1] }
            }
            transition={
              reduced
                ? undefined
                : { duration: 1.6, ease: "easeInOut", repeat: Infinity }
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
