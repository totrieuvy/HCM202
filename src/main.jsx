import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/vietnam-theme.css";
import "./index.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import MiniGamePage from "./pages/MiniGamePage";
import AiChatPage from "./pages/AiChatPage";
import NotFound from "./pages/NotFound";
import MapJourney from "./pages/MapJourney";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="minigame" element={<MiniGamePage />} />
          <Route path="aichat" element={<AiChatPage />} />
          <Route path="map" element={<MapJourney />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
