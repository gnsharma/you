import { Reveal } from "~/components/Reveal";
import { SectionShell } from "~/components/SectionShell";
import { StaggerLines } from "~/components/StaggerLines";
import type { SectionProps } from "./types";

/** A set of short observations revealed with a stagger. */
export function CardsSection({ section }: SectionProps<"cards">) {
  return (
    <SectionShell id={section.id} contentClassName="text-center">
      {section.title ? (
        <Reveal kind="fade">
          <h2 className="mb-14 text-3xl font-medium tracking-tight sm:text-4xl">
            {section.title}
          </h2>
        </Reveal>
      ) : null}
      <StaggerLines
        lines={section.cards}
        className="space-y-4"
        lineClassName="rounded-2xl border border-white/10 bg-surface/50 px-7 py-6 text-body text-primary/90"
      />
    </SectionShell>
  );
}
