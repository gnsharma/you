import { Reveal } from "~/components/Reveal";
import { SectionShell } from "~/components/SectionShell";
import { cx } from "~/utils/cx";
import type { SectionProps } from "./types";

/** A paper-inspired letter, read at a readable measure. */
export function LetterSection({ section }: SectionProps<"letter">) {
  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow}>
      <Reveal kind="fade" duration={1.2}>
        <article className="space-y-7 text-left text-body text-primary/85">
          {section.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          <footer className="space-y-1 pt-8 text-secondary">
            {section.signature.map((line, i) => (
              <p
                key={i}
                className={cx(
                  i === section.signature.length - 1 && "text-primary",
                )}
              >
                {line}
              </p>
            ))}
          </footer>
        </article>
      </Reveal>
    </SectionShell>
  );
}
