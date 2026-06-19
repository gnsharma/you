import { Reveal } from "~/components/Reveal";
import { PhotoReveal } from "~/components/PhotoReveal";
import { SectionShell } from "~/components/SectionShell";
import { getPhoto } from "~/content/photos";
import type { SectionProps } from "./types";

/** A large photo reveal with optional minimal copy and caption. */
export function PhotoSection({ section }: SectionProps<"photo">) {
  const photo = getPhoto(section.photoId);
  const caption = section.caption ?? photo.caption;

  return (
    <SectionShell
      id={section.id}
      contentWidth="max-w-4xl"
      contentClassName="text-center"
    >
      <PhotoReveal photo={photo} />

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
