import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Story from "./routes/Story";
import { SmoothScroll } from "./components/SmoothScroll";
import { AmbientBackground } from "./components/AmbientBackground";
import { CursorGlow } from "./components/CursorGlow";
import { ProgressBar } from "./components/ProgressBar";
import { LoadingSequence } from "./components/LoadingSequence";
import { MusicToggle } from "./components/MusicToggle";

// The second experience is reached only via a link — load it on demand.
const Vrishti = lazy(() => import("./routes/Vrishti"));

export default function App() {
  return (
    <SmoothScroll>
      <AmbientBackground />
      <CursorGlow />
      <ProgressBar />

      <Routes>
        <Route path="/" element={<Story />} />
        <Route
          path="/vrishti"
          element={
            <Suspense fallback={<div className="min-h-dvh bg-bg" />}>
              <Vrishti />
            </Suspense>
          }
        />
      </Routes>

      <MusicToggle />
      <LoadingSequence />
    </SmoothScroll>
  );
}
