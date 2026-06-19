/**
 * Content models — the single source of truth for the entire experience.
 *
 * Every chapter is a declarative `StorySection`. The renderer maps each
 * section's `type` to a component (see app/sections/registry), so adding a
 * future chapter means: add a variant here, write its component, register it.
 * Because `StorySection` is a discriminated union, TypeScript will refuse to
 * compile until the new type is handled everywhere — no silent gaps.
 */

export type AnimationKind = "fade" | "scale" | "blur" | "typewriter";

export interface SectionAnimation {
  enter: AnimationKind;
  /** seconds */
  duration?: number;
  /** seconds */
  delay?: number;
}

/** Fields shared by every section. */
interface BaseSection {
  id: string;
  /** Small uppercased label shown above a chapter. */
  eyebrow?: string;
  animation?: SectionAnimation;
  /** Set false to keep a chapter in content but out of the flow. */
  visible?: boolean;
}

/** Opening: black screen, typewriter that types then deletes phrases. */
export interface OpeningSection extends BaseSection {
  type: "opening";
  phrases: OpeningPhrase[];
}

export interface OpeningPhrase {
  text: string;
  /** ms to hold the fully-typed phrase before continuing. */
  hold?: number;
  /** delete the phrase after holding (vs. leaving it and fading). */
  delete?: boolean;
}

/** Hero: large typography with a faint continue indicator. */
export interface HeroSection extends BaseSection {
  type: "hero";
  /** Use "\n" for intentional line breaks. */
  title: string;
  continueLabel?: string;
}

/** Text: a sequence of lines revealed one at a time on scroll. */
export interface TextSection extends BaseSection {
  type: "text";
  title?: string;
  body: string[];
  align?: "left" | "center";
}

/** Photo: a large image reveal with optional caption / minimal copy. */
export interface PhotoSection extends BaseSection {
  type: "photo";
  /** References an entry in the photos manifest (no hardcoded paths here). */
  photoId: string;
  /** Overrides the manifest caption for this placement. "\n" allowed. */
  caption?: string;
  /** Minimal copy shown alongside the image, e.g. ["Everything changed."]. */
  body?: string[];
}

/** Cards: short observations revealed with a stagger. */
export interface CardsSection extends BaseSection {
  type: "cards";
  title?: string;
  cards: string[];
}

/** Timeline: milestones revealed on scroll. */
export interface TimelineSection extends BaseSection {
  type: "timeline";
  title?: string;
  entries: TimelineEntry[];
}

export interface TimelineEntry {
  id: string;
  /** e.g. "5 May 2025"; omit for unscheduled milestones. */
  date?: string;
  label: string;
  /** Expanded copy revealed when the milestone is focused. */
  detail?: string;
}

/** Letter: a paper-inspired passage with a signature. */
export interface LetterSection extends BaseSection {
  type: "letter";
  title?: string;
  paragraphs: string[];
  /** e.g. ["Love,", "Govind"] — rendered on separate lines. */
  signature: string[];
}

/** Ending: inverted (light) closing, optional "one more thing" doorway. */
export interface EndingSection extends BaseSection {
  type: "ending";
  body: string[];
  /** Render on a light background instead of dark. */
  invert?: boolean;
  oneMoreThing?: {
    label: string;
    /** In-app route, e.g. "/vrishti". */
    to: string;
  };
}

export type StorySection =
  | OpeningSection
  | HeroSection
  | TextSection
  | PhotoSection
  | CardsSection
  | TimelineSection
  | LetterSection
  | EndingSection;

export type StorySectionType = StorySection["type"];

/** Narrow the union to a single variant by its `type`. */
export type StorySectionOf<K extends StorySectionType> = Extract<
  StorySection,
  { type: K }
>;

/** A reusable letter shape, used by both experiences. */
export interface Letter {
  eyebrow?: string;
  title?: string;
  paragraphs: string[];
  signature: string[];
}

/** A photo in the manifest. */
export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  aspect: "portrait" | "landscape" | "square";
  order: number;
}
