import type { Variants } from "framer-motion";
import type { AnimationKind } from "~/content/types";

/** Long, calm easings — nothing springs or bounces. */
export const EASE_CALM: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = { fast: 0.5, base: 0.9, slow: 1.4 } as const;

/**
 * The enter animation for a section, by kind. Under reduced motion every kind
 * collapses to a near-instant opacity change — no movement, scale, or blur.
 */
export function revealVariants(
  kind: AnimationKind,
  duration: number,
  delay: number,
  reduced: boolean,
): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.001, delay: 0 } },
    };
  }

  const transition = { duration, delay, ease: EASE_CALM };

  switch (kind) {
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.96 },
        visible: { opacity: 1, scale: 1, transition },
      };
    case "blur":
      return {
        hidden: { opacity: 0, scale: 1.04, filter: "blur(16px)" },
        visible: {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          transition: { ...transition, duration: Math.max(duration, DURATION.slow) },
        },
      };
    case "typewriter":
    case "fade":
    default:
      // Fade with a slight upward drift — never a slide.
      return {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition },
      };
  }
}

/** Parent variant that cascades its children into view. */
export function staggerParent(stagger = 0.14, delayChildren = 0.1): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/** Child variant for staggered reveals. */
export function staggerChild(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.001 } },
    };
  }
  return {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_CALM } },
  };
}
