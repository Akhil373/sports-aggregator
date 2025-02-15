// import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Fixtures from "./pages/Fixtures";
import LeagueTable from "./pages/LeagueTable";
import News from "./pages/News";

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full">
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/leaderboards" element={<LeagueTable />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
