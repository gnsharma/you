import { StoryRenderer } from "~/components/StoryRenderer";
import { vrishtiSections } from "~/content";

export default function Vrishti() {
  return (
    <main>
      <StoryRenderer sections={vrishtiSections} />
    </main>
  );
}
