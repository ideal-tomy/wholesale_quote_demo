import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DeskApp } from "./app/DeskApp";
import { LandingPage } from "./app/LandingPage";
import { DemoIntro } from "./components/demo-intro/DemoIntro";

function isEmbedIntro() {
  return new URLSearchParams(window.location.search).get("embed") === "intro";
}

export default function App() {
  if (isEmbedIntro()) {
    return (
      <main className="ki-embed-intro">
        <DemoIntro />
      </main>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/desk" replace />} />
        <Route path="/desk" element={<DeskApp />} />
        <Route path="/lp" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/desk" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
