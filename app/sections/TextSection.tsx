import { Reveal } from "~/components/Reveal";
import { SectionShell } from "~/components/SectionShell";
import { StaggerLines } from "~/components/StaggerLines";
import { cx } from "~/utils/cx";
import type { SectionProps } from "./types";

/** A passage of short lines, revealed one at a time. */
export function TextSection({ section }: SectionProps<"text">) {
  const align = section.align === "left" ? "text-left" : "text-center";
  return (
    <SectionShell
      id={section.id}
      eyebrow={section.eyebrow}
      contentClassName={align}
    >
      {section.title ? (
        <Reveal kind="fade">
          <h2 className="mb-12 text-3xl font-medium tracking-tight sm:text-4xl">
            {section.title}
          </h2>
        </Reveal>
      ) : null}
      <StaggerLines
        lines={section.body}
        className={cx("space-y-5", align === "text-center" && "mx-auto")}
        lineClassName="text-lead text-primary/90"
      />
    </SectionShell>
  );
}
