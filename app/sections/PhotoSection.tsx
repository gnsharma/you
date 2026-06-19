import { Reveal } from "~/components/Reveal";
import { SectionShell } from "~/components/SectionShell";
import { getPhoto } from "~/content/photos";
import { cx } from "~/utils/cx";
import type { SectionProps } from "./types";

const ASPECT: Record<string, string> = {
  portrait: "aspect-[4/5] max-w-md",
  landscape: "aspect-[16/10]",
  square: "aspect-square max-w-xl",
};

/**
 * A large photo reveal (opacity + blur + scale). The real image and generated
 * placeholder art are wired in the section-components pass; for now a reserved
 * aspect-correct frame prevents layout shift.
 */
export function PhotoSection({ section }: SectionProps<"photo">) {
  const photo = getPhoto(section.photoId);
  const caption = section.caption ?? photo.caption;

  return (
    <SectionShell id={section.id} contentClassName="max-w-4xl text-center">
      <Reveal kind="blur" duration={1.4}>
        <div
          role="img"
          aria-label={photo.alt}
          className={cx(
            "mx-auto w-full overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10",
            ASPECT[photo.aspect],
          )}
        />
      </Reveal>

      {section.body ? (
        <Reveal kind="fade" delay={0.15}>
          <div className="mt-12 space-y-2">
            {section.body.map((line, i) => (
              <p key={i} className="text-lead text-primary">
                {line}
              </p>
            ))}
          </div>
        </Reveal>
      ) : null}

      {caption ? (
        <Reveal kind="fade" delay={0.15}>
          <p className="mt-8 whitespace-pre-line text-caption text-secondary">
            {caption}
          </p>
        </Reveal>
      ) : null}
    </SectionShell>
  );
}
