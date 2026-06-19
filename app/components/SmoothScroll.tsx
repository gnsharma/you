import Lenis from "lenis";
import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

/**
 * Wraps the app in Lenis-driven smooth scrolling and resets to the top on
 * route changes. Falls back to native scrolling under reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;

    let frame = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
