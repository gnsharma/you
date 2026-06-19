import type { ComponentType } from "react";
import type { StorySectionOf, StorySectionType } from "~/content/types";

/** Props every section component receives, narrowed to its own variant. */
export interface SectionProps<K extends StorySectionType> {
  section: StorySectionOf<K>;
}

export type SectionComponent<K extends StorySectionType> = ComponentType<
  SectionProps<K>
>;
