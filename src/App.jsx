import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Background from "./components/Background";
import NotFound from "./components/NotFound";
import Fixtures from "./pages/Fixtures";
import Leaderboards from "./pages/Leaderboards";
import News from "./pages/News";

function App() {
  return (
    <Router>
      <Background>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<News />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Background>
    </Router>
  );
}

export default App;
