import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { audio } from "~/content/audio";

/**
 * A tiny corner control for optional ambient audio. Renders nothing unless a
 * track is configured (see app/content/audio.ts). Never autoplays — starts
 * muted/stopped and only plays on an explicit tap.
 */
export function MusicToggle() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  if (!audio.src) return null;

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={ref} src={audio.src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        aria-pressed={playing}
        className="fixed bottom-6 right-6 z-40 rounded-full border border-white/15 bg-bg/50 p-3 text-secondary backdrop-blur-sm transition-colors duration-300 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {playing ? (
          <Volume2 className="size-4" strokeWidth={1.5} />
        ) : (
          <VolumeX className="size-4" strokeWidth={1.5} />
        )}
      </button>
    </>
  );
}
