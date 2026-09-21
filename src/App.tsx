import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DeskApp } from "./app/DeskApp";
import { LandingPage } from "./app/LandingPage";

export default function App() {
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
