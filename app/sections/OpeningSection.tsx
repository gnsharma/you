import { AnimatePresence, motion } from "framer-motion";
import { ContinueIndicator } from "~/components/ContinueIndicator";
import { useTypewriter } from "~/hooks/useTypewriter";
import type { SectionProps } from "./types";

/**
 * The opening on a black screen: a typewriter types the first phrase, deletes
 * it, then types "this is ours." A faint scroll cue appears once it settles.
 */
export function OpeningSection({ section }: SectionProps<"opening">) {
  const { text, done } = useTypewriter(section.phrases);
  const fullText = section.phrases.map((p) => p.text).join(" ");

  return (
    <section
      id={section.id}
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 text-center"
    >
      {/* Spoken once, fully, for assistive tech. */}
      <p className="sr-only">{fullText}</p>

      <p aria-hidden className="text-lead text-primary">
        <span className="whitespace-pre-line">{text}</span>
        <span
          className="ml-1 inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-accent"
          style={done ? { opacity: 0 } : { animation: "caret-blink 1.1s steps(1) infinite" }}
        />
      </p>

      <AnimatePresence>
        {done ? (
          <motion.div
            key="cue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <ContinueIndicator />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
