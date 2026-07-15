import { useMemo } from "react";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

/**
 * A starry night behind everything: a deep night-sky gradient, a faint
 * Milky Way band, a field of twinkling stars, and a single warm glow low on
 * the horizon (a nod to the dawn/birth warmth). Fixed, non-interactive, and
 * far in the background. Twinkle is disabled under reduced motion via CSS.
 */
export function AmbientBackground() {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Night-sky depth: cooler at the top, warmer toward the horizon. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, #0b1024 0%, #070a15 45%, #05070f 100%)",
        }}
      />

      {/* Faint Milky Way — a soft blurred band across the sky. */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "linear-gradient(115deg, transparent 38%, rgba(150,170,220,0.06) 50%, rgba(200,190,230,0.05) 56%, transparent 66%)",
          filter: "blur(28px)",
        }}
      />

      <StarField reduced={reduced} />

      {/* Warm horizon glow, low and centered — keeps the night from going icy. */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/5"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 120%, rgba(244,194,194,0.10), rgba(232,185,138,0.05) 45%, transparent 72%)",
        }}
      />
    </div>
  );
}

/** A field of stars: mostly faint pinpricks, a few brighter and slightly
 *  colored. Twinkle timing varies per star so the sky never pulses in unison. */
function StarField({ reduced }: { reduced: boolean }) {
  const stars = useMemo(() => {
    const tints = ["#ffffff", "#ffffff", "#fdf2e0", "#e6efff", "#f7e9f2"];
    return Array.from({ length: 150 }, (_, i) => {
      const bright = i % 11 === 0; // ~1 in 11 is a brighter star
      const size = bright ? 1.8 + Math.random() * 1.4 : 0.6 + Math.random() * 1.2;
      const max = bright ? 0.85 + Math.random() * 0.15 : 0.4 + Math.random() * 0.4;
      return {
        left: Math.random() * 100,
        top: Math.random() * 100,
        size,
        color: tints[Math.floor(Math.random() * tints.length)],
        min: max * 0.3,
        max,
        duration: 2.8 + Math.random() * 4.5,
        delay: Math.random() * -6,
        bright,
      };
    });
  }, []);

  return (
    <>
      {stars.map((s, i) => (
        <span
          key={i}
          className="star absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            opacity: reduced ? s.max : undefined,
            boxShadow: s.bright ? `0 0 ${s.size * 2.5}px ${s.color}` : undefined,
            ["--star-min" as string]: s.min,
            ["--star-max" as string]: s.max,
            animation: reduced
              ? undefined
              : `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}
