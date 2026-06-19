import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "~/hooks/useMediaQuery";

const SIZE = 460;

/**
 * A very subtle accent glow that trails the cursor. Desktop (fine-pointer)
 * only, and disabled under reduced motion. Never intercepts pointer events.
 */
export function CursorGlow() {
  const reduced = usePrefersReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !reduced;

  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const sx = useSpring(x, { stiffness: 90, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - SIZE / 2);
      y.set(event.clientY - SIZE / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-20 rounded-full"
      style={{
        x: sx,
        y: sy,
        width: SIZE,
        height: SIZE,
        background:
          "radial-gradient(circle, rgba(244,194,194,0.09), transparent 62%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
