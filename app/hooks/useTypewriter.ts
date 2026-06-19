import { useEffect, useState } from "react";
import type { OpeningPhrase } from "~/content/types";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface TypewriterOptions {
  /** ms per typed character */
  typeSpeed?: number;
  /** ms per deleted character */
  deleteSpeed?: number;
  /** ms before typing begins (lets the loading veil lift first) */
  startDelay?: number;
}

/**
 * Plays a sequence of phrases as a typewriter: types each phrase, holds, and
 * (if asked) deletes it before the next. Under reduced motion it skips the
 * animation and settles on the final phrase immediately.
 */
export function useTypewriter(
  phrases: OpeningPhrase[],
  { typeSpeed = 55, deleteSpeed = 30, startDelay = 900 }: TypewriterOptions = {},
): { text: string; done: boolean } {
  const reduced = usePrefersReducedMotion();
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setText(phrases.at(-1)?.text ?? "");
      setDone(true);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    (async () => {
      await wait(startDelay);
      for (let p = 0; p < phrases.length; p++) {
        const phrase = phrases[p];
        const isLast = p === phrases.length - 1;

        for (let i = 1; i <= phrase.text.length; i++) {
          if (cancelled) return;
          setText(phrase.text.slice(0, i));
          await wait(typeSpeed);
        }

        await wait(phrase.hold ?? 1400);

        if (phrase.delete && !isLast) {
          for (let i = phrase.text.length; i >= 0; i--) {
            if (cancelled) return;
            setText(phrase.text.slice(0, i));
            await wait(deleteSpeed);
          }
        }
      }
      if (!cancelled) setDone(true);
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [phrases, reduced, typeSpeed, deleteSpeed, startDelay]);

  return { text, done };
}
