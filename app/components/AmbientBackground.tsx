import { motion } from "framer-motion";
import { useMemo } from "react";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

/**
 * The atmosphere behind everything: two slowly drifting radial glows, a fine
 * grain, and a few floating dust motes. Fixed, non-interactive, and far in the
 * background. Drift and dust are disabled under reduced motion.
 */
export function AmbientBackground() {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        className="absolute -inset-[25%]"
        style={{
          background:
            "radial-gradient(38% 38% at 28% 22%, rgba(244,194,194,0.07), transparent 70%)",
        }}
        animate={reduced ? undefined : { x: ["-3%", "4%", "-3%"], y: ["-2%", "3%", "-2%"] }}
        transition={
          reduced
            ? undefined
            : { duration: 28, ease: "easeInOut", repeat: Infinity }
        }
      />
      <motion.div
        className="absolute -inset-[25%]"
        style={{
          background:
            "radial-gradient(44% 44% at 74% 80%, rgba(126,134,176,0.06), transparent 72%)",
        }}
        animate={reduced ? undefined : { x: ["3%", "-3%", "3%"], y: ["2%", "-4%", "2%"] }}
        transition={
          reduced
            ? undefined
            : { duration: 34, ease: "easeInOut", repeat: Infinity }
        }
      />

      <Grain />
      {reduced ? null : <Dust />}
    </div>
  );
}

/** Static fractal-noise grain, blended softly over the background. */
function Grain() {
  return (
    <svg
      className="absolute inset-0 size-full opacity-[0.04] mix-blend-soft-light"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="ambient-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="2"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#ambient-grain)" />
    </svg>
  );
}

/** A handful of slow, faint dust motes. */
function Dust() {
  const motes = useMemo(
    () =>
      Array.from({ length: 14 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 1.5,
        drift: 16 + Math.random() * 20,
        delay: Math.random() * -20,
        opacity: 0.1 + Math.random() * 0.18,
      })),
    [],
  );

  return (
    <>
      {motes.map((mote, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${mote.left}%`,
            top: `${mote.top}%`,
            width: mote.size,
            height: mote.size,
          }}
          animate={{ y: [0, -24, 0], opacity: [0, mote.opacity, 0] }}
          transition={{
            duration: mote.drift,
            ease: "easeInOut",
            repeat: Infinity,
            delay: mote.delay,
          }}
        />
      ))}
    </>
  );
}
