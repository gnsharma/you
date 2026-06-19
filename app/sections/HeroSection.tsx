import { Reveal } from "~/components/Reveal";
import { SectionShell } from "~/components/SectionShell";
import type { SectionProps } from "./types";

/** Large typography hero. The continue indicator is added in a later pass. */
export function HeroSection({ section }: SectionProps<"hero">) {
  return (
    <SectionShell
      id={section.id}
      eyebrow={section.eyebrow}
      contentClassName="text-center"
    >
      <Reveal kind="fade" duration={1.2}>
        <h1 className="text-display font-medium whitespace-pre-line text-balance">
          {section.title}
        </h1>
      </Reveal>
    </SectionShell>
  );
}
