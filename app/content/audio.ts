/**
 * Optional ambient audio. Off by default — there is no autoplay and no track
 * shipped. To enable: drop a file in /public/audio and set `src` to its path
 * (e.g. "/audio/ambient.mp3"). The MusicToggle appears only when `src` is set.
 */
export interface AudioConfig {
  src: string | null;
  title?: string;
}

export const audio: AudioConfig = {
  src: null,
};
