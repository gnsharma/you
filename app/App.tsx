import { Routes, Route } from "react-router-dom";
import Story from "./routes/Story";
import Vrishti from "./routes/Vrishti";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Story />} />
      <Route path="/vrishti" element={<Vrishti />} />
    </Routes>
  );
}
