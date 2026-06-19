import type { Letter, StorySection } from "./types";

/**
 * The second experience — a letter from a father to his daughter, meant to be
 * read years from now. This is the emotional climax of the project.
 */
export const letterToVrishti: Letter = {
  paragraphs: [
    "Hello, my love. If you're reading this, you're older now — old enough to understand what I couldn't tell you when you were small.",
    "I want to tell you about your mother.",
    "Before you ever took a breath, she gave you parts of herself you'll never see. There were months her body ached and she kept going. Appointments that frightened us both. Long, quiet nights. She carried all of it without complaint, so that you could arrive safely.",
    "She loved you before she met you. I watched it happen. She would rest her hand where you were and talk to you like you'd known each other forever. To her, you were never a stranger.",
    "When you finally arrived, she became someone even I had never fully met. Braver. Gentler. Tireless in a way I didn't know a person could be. She learned every sound you made. She stayed awake so you could rest. She worried, always — because she loved you that much.",
    "One day you might argue with her. You might be certain she doesn't understand. When that day comes, come back and read this.",
    "Admire her — not because I'm asking you to, but because she earned it, in a thousand quiet moments you were too young to remember. I was there for every one of them.",
    "You are here because she was brave. Never forget that.",
  ],
  signature: ["All my love,", "Papa"],
};

/**
 * The second experience as declarative sections, rendered by the same engine
 * as the main story. The opening title sets the tone; the letter is the heart.
 */
export const vrishtiSections: StorySection[] = [
  {
    id: "vrishti-hero",
    type: "hero",
    eyebrow: "Read this when you're older",
    title: "For Vrishti.",
    animation: { enter: "fade" },
  },
  {
    id: "vrishti-letter",
    type: "letter",
    paragraphs: letterToVrishti.paragraphs,
    signature: letterToVrishti.signature,
    animation: { enter: "fade" },
  },
];
