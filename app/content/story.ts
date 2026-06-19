import type { StorySection } from "./types";
import { mainLetter } from "./letter";
import { timeline } from "./timeline";

/**
 * The main experience, chapter by chapter. This array is the entire script —
 * reorder it, hide a chapter (`visible: false`), or add a future one, and the
 * renderer follows. No component edits required.
 */
export const storySections: StorySection[] = [
  {
    id: "opening",
    type: "opening",
    animation: { enter: "typewriter" },
    phrases: [
      { text: "Every family has a story.", hold: 1600, delete: true },
      { text: "This is ours.", hold: 1600 },
    ],
  },
  {
    id: "hero",
    type: "hero",
    title: "Before she was born,\nthere was you.",
    continueLabel: "Continue",
    animation: { enter: "fade" },
  },
  {
    id: "before",
    type: "photo",
    photoId: "before",
    caption: "Before we became parents,\nwe were simply dreaming.",
    animation: { enter: "blur" },
  },
  {
    id: "pregnancy",
    type: "text",
    eyebrow: "Pregnancy",
    body: [
      "Pregnancy wasn't easy.",
      "There were appointments.",
      "There were worries.",
      "Days when your body asked more of you than ever before.",
      "You kept going.",
      "You kept smiling.",
      "You kept believing.",
      "I'm endlessly proud of you.",
    ],
    animation: { enter: "fade" },
  },
  {
    id: "becoming",
    type: "photo",
    photoId: "becoming",
    body: ["Everything changed."],
    animation: { enter: "blur" },
  },
  {
    id: "noticed",
    type: "cards",
    title: "Things I noticed.",
    cards: [
      "You learned every little sound she makes.",
      "You stayed awake so she could sleep.",
      "You worried because you cared.",
      "You celebrated every tiny milestone.",
      "You gave her everything.",
    ],
    animation: { enter: "fade" },
  },
  {
    id: "woman",
    type: "text",
    eyebrow: "The woman you've become",
    body: [
      "I watched you become stronger.",
      "Kinder.",
      "More patient.",
      "More confident.",
      "More beautiful.",
      "Not because of how you look.",
      "Because of who you've become.",
    ],
    animation: { enter: "fade" },
  },
  {
    id: "timeline",
    type: "timeline",
    entries: timeline,
    animation: { enter: "fade" },
  },
  {
    id: "letter",
    type: "letter",
    eyebrow: mainLetter.eyebrow,
    paragraphs: mainLetter.paragraphs,
    signature: mainLetter.signature,
    animation: { enter: "fade" },
  },
  {
    id: "ending",
    type: "ending",
    invert: true,
    body: [
      "Thank you.",
      "For every sacrifice.",
      "For every sleepless night.",
      "For every cuddle.",
      "For every smile.",
      "I love you.",
    ],
    oneMoreThing: { label: "One more thing…", to: "/vrishti" },
    animation: { enter: "fade" },
  },
];
