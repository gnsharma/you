import { useReducedMotion } from "framer-motion";

/**
 * Whether the visitor asked for reduced motion. Framer Motion reads the OS
 * setting; we coerce its `null` (unknown) to `false` so motion is the default
 * only once we positively know the visitor hasn't opted out.
 */
export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() ?? false;
}
