import type { ComponentType } from "react";
import { visibleSections, type StorySection } from "~/content";
import { sectionRegistry } from "~/sections/registry";

/**
 * Renders an ordered list of sections by dispatching each to its registered
 * component. The single cast below is the one place the type union is widened —
 * the lookup is exhaustive (see registry), so dispatch is safe.
 */
export function StoryRenderer({ sections }: { sections: StorySection[] }) {
  return (
    <>
      {visibleSections(sections).map((section) => {
        const Component = sectionRegistry[section.type] as ComponentType<{
          section: StorySection;
        }>;
        return <Component key={section.id} section={section} />;
      })}
    </>
  );
}
