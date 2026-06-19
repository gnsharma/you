import { Reveal } from "~/components/Reveal";
import { Eyebrow } from "~/components/Eyebrow";
import { ContinueIndicator } from "~/components/ContinueIndicator";
import type { SectionProps } from "./types";

/**
 * Large typographic hero — the thesis of the experience. Wider than the body
 * measure so the authored line breaks land cleanly, with a single faint
 * continue cue as the only motion.
 */
export function HeroSection({ section }: SectionProps<"hero">) {
  return (
    <section
      id={section.id}
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-28 text-center sm:py-36"
    >
      <div className="mx-auto w-full max-w-5xl">
        {section.eyebrow ? (
          <Reveal kind="fade" duration={1}>
            <Eyebrow className="mb-10">{section.eyebrow}</Eyebrow>
          </Reveal>
        ) : null}
        <Reveal kind="fade" duration={1.2}>
          <h1 className="whitespace-pre-line text-balance font-medium leading-[1.05] tracking-[-0.025em] text-[clamp(2.75rem,7vw,5rem)]">
            {section.title}
          </h1>
        </Reveal>
      </div>

      {section.continueLabel ? (
        <ContinueIndicator label={section.continueLabel} />
      ) : null}
    </section>
  );
}
