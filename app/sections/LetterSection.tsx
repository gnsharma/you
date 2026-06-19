import { Reveal } from "~/components/Reveal";
import { SectionShell } from "~/components/SectionShell";
import { cx } from "~/utils/cx";
import type { SectionProps } from "./types";

/**
 * A paper-inspired letter: a quiet sheet lifted just off the dark ground, read
 * at a comfortable measure. No handwriting fonts — the warmth is in the words
 * and the signature, where the one touch of accent lives.
 */
export function LetterSection({ section }: SectionProps<"letter">) {
  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow}>
      <Reveal kind="fade" duration={1.2}>
        <article className="relative rounded-[1.75rem] border border-white/10 bg-surface/60 px-8 py-12 text-left shadow-[0_40px_90px_-50px_rgba(0,0,0,0.85)] sm:px-14 sm:py-16">
          <div className="space-y-7 text-body text-primary/85">
            {section.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <footer className="mt-12 space-y-1">
            {section.signature.map((line, i) => {
              const isName = i === section.signature.length - 1;
              return (
                <p
                  key={i}
                  className={cx(
                    isName ? "text-xl text-accent" : "text-body text-secondary",
                  )}
                >
                  {line}
                </p>
              );
            })}
          </footer>
        </article>
      </Reveal>
    </SectionShell>
  );
}
