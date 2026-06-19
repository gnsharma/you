import type { StorySectionType } from "~/content/types";
import type { SectionComponent } from "./types";
import { OpeningSection } from "./OpeningSection";
import { HeroSection } from "./HeroSection";
import { TextSection } from "./TextSection";
import { PhotoSection } from "./PhotoSection";
import { CardsSection } from "./CardsSection";
import { TimelineSection } from "./TimelineSection";
import { LetterSection } from "./LetterSection";
import { EndingSection } from "./EndingSection";

/**
 * Maps each section type to the component that renders it. The mapped type
 * `{ [K in StorySectionType]: ... }` makes this exhaustive: add a new section
 * type and the build fails until it is registered here. No switch statements,
 * no silent gaps.
 */
export const sectionRegistry: {
  [K in StorySectionType]: SectionComponent<K>;
} = {
  opening: OpeningSection,
  hero: HeroSection,
  text: TextSection,
  photo: PhotoSection,
  cards: CardsSection,
  timeline: TimelineSection,
  letter: LetterSection,
  ending: EndingSection,
};
