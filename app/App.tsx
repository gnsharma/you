import { Routes, Route } from "react-router-dom";
import Story from "./routes/Story";
import Vrishti from "./routes/Vrishti";
import { SmoothScroll } from "./components/SmoothScroll";
import { AmbientBackground } from "./components/AmbientBackground";
import { CursorGlow } from "./components/CursorGlow";
import { ProgressBar } from "./components/ProgressBar";
import { LoadingSequence } from "./components/LoadingSequence";
import { MusicToggle } from "./components/MusicToggle";

export default function App() {
  return (
    <SmoothScroll>
      <AmbientBackground />
      <CursorGlow />
      <ProgressBar />

      <Routes>
        <Route path="/" element={<Story />} />
        <Route path="/vrishti" element={<Vrishti />} />
      </Routes>

      <MusicToggle />
      <LoadingSequence />
    </SmoothScroll>
  );
}
