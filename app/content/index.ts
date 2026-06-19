import type { StorySection } from "./types";

export * from "./types";
export { storySections } from "./story";
export { vrishtiSections, letterToVrishti } from "./letterToVrishti";
export { mainLetter } from "./letter";
export { timeline } from "./timeline";
export { photos, getPhoto } from "./photos";

/** Drop chapters explicitly hidden via `visible: false`. */
export function visibleSections(sections: StorySection[]): StorySection[] {
  return sections.filter((section) => section.visible !== false);
}
