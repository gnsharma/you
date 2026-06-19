import type { Photo } from "./types";

/**
 * Photo manifest. Sections reference photos by `id`, never by path, so
 * swapping in real photos means dropping files into /public/photos and
 * editing only this file.
 *
 * Placeholder assets live at the listed paths until real photos arrive;
 * keep the aspect ratio accurate to avoid layout shift when they do.
 */
export const photos: Photo[] = [
  {
    id: "before",
    src: "/photos/before.svg",
    alt: "Placeholder — a quiet moment from before parenthood",
    caption: "Before we became parents,\nwe were simply dreaming.",
    aspect: "landscape",
    order: 1,
  },
  {
    id: "becoming",
    src: "/photos/becoming.svg",
    alt: "Placeholder — Anika holding Vrishti for the first time",
    aspect: "portrait",
    order: 2,
  },
];

const byId = new Map(photos.map((p) => [p.id, p]));

/** Resolve a photo by id. Throws in dev if the id is unknown. */
export function getPhoto(id: string): Photo {
  const photo = byId.get(id);
  if (!photo) {
    throw new Error(
      `Unknown photo id "${id}". Add it to app/content/photos.ts.`,
    );
  }
  return photo;
}
