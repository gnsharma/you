import { StoryRenderer } from "~/components/StoryRenderer";
import { storySections } from "~/content";

export default function Story() {
  return (
    <main>
      <StoryRenderer sections={storySections} />
    </main>
  );
}
