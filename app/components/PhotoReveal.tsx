import { motion } from "framer-motion";
import type { Photo } from "~/content/types";
import { EASE_CALM } from "~/animations/variants";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";
import { cx } from "~/utils/cx";

const ASPECT: Record<Photo["aspect"], string> = {
  portrait: "aspect-[4/5] max-w-md",
  landscape: "aspect-[16/10]",
  square: "aspect-square max-w-xl",
};

/**
 * A large photo that reveals with opacity + blur + scale as it enters view,
 * and zooms a touch on hover (desktop). Lazy-loaded; the frame reserves its
 * aspect ratio so there is no layout shift when the image decodes.
 */
export function PhotoReveal({
  photo,
  className,
}: {
  photo: Photo;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.figure
      className={cx(
        "group relative mx-auto overflow-hidden rounded-3xl ring-1 ring-white/10",
        ASPECT[photo.aspect],
        className,
      )}
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, scale: 1.04, filter: "blur(16px)" }
      }
      whileInView={
        reduced
          ? { opacity: 1 }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduced ? 0.001 : 1.4, ease: EASE_CALM }}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        className={cx(
          "size-full object-cover",
          !reduced &&
            "transition-transform duration-[1200ms] ease-out will-change-transform group-hover:scale-[1.04]",
        )}
      />
    </motion.figure>
  );
}
