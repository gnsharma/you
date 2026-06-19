import { Reveal } from "~/components/Reveal";
import { SectionShell } from "~/components/SectionShell";
import type { SectionProps } from "./types";

/**
 * Opening on a black screen. The full typewriter (type → delete → type) is
 * wired in a later pass; for now it fades in the final phrase so the flow
 * reads end to end.
 */
export function OpeningSection({ section }: SectionProps<"opening">) {
  const last = section.phrases.at(-1)?.text ?? "";
  return (
    <SectionShell id={section.id} contentClassName="text-center">
      <Reveal kind="fade" duration={1.4}>
        <p className="text-lead text-primary">{last}</p>
      </Reveal>
    </SectionShell>
  );
}
