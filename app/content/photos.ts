import type { Photo } from "./types";

/**
 * Photo manifest. Sections reference photos by `id`, never by path, so
 * swapping in real photos means dropping files into /public/photos and
 * editing only this file. Keep `aspect` accurate to the file to avoid
 * layout shift.
 */
export const photos: Photo[] = [
  {
    id: "before",
    src: "/photos/before.jpeg",
    alt: "A quiet moment before parenthood — a hand resting where Vrishti was growing",
    caption: "Before we became parents,\nwe were simply dreaming.",
    aspect: "portrait",
    order: 1,
  },
  {
    id: "becoming",
    src: "/photos/becoming.jpeg",
    alt: "Anika holding Vrishti for the first time",
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
