import type { TimelineEntry } from "./types";

/**
 * The milestones of our story. Each entry can carry a `detail` that expands
 * as the reader focuses it. Adding a future chapter (first birthday, first
 * steps) is a single new entry here.
 */
export const timeline: TimelineEntry[] = [
  {
    id: "married",
    date: "5 May 2025",
    label: "We got married",
    detail: "The day everything began — a life chosen, on purpose, together.",
  },
  {
    id: "pregnancy",
    label: "Pregnancy",
    detail: "Two became almost-three. Months of waiting, hoping, and quiet courage.",
  },
  {
    id: "hospital",
    label: "Hospital visits",
    detail: "The scans, the appointments, the held breaths between good news.",
  },
  {
    id: "vrishti",
    date: "26 January 2026",
    label: "Vrishti arrived",
    detail: "She opened her eyes, and the whole world rearranged itself around her.",
  },
  {
    id: "today",
    label: "Today",
    detail: "Still here. Still grateful. Still, somehow, just beginning.",
  },
];
