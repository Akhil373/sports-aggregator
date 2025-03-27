// import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Fixtures from "./pages/Fixtures";
import Home from "./pages/Home";
import News from "./pages/News";

const AppContent = () => {
  const location = useLocation();
  const [pageBgClass, setPageBgClass] = useState("");
  const [darkTheme, setDarkTheme] = useState(() => {
    const saved = localStorage.getItem("darkTheme");
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  const toggleTheme = () => {
    setDarkTheme((prev) => {
      const newTheme = !prev;
      localStorage.setItem("darkTheme", JSON.stringify(newTheme));
      return newTheme;
    });
  };

  const clearTheme = () => {
    localStorage.removeItem("darkTheme");
    setDarkTheme(
      window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
  };

  useEffect(() => {
    if (location.pathname === "/fixtures") {
      setPageBgClass(
        "dark:from-fixtures-bg-theme from-fixtures-bg-theme-light min-h-screen bg-gradient-to-br to-white px-15 dark:to-black dark:text-white py-3",
      );
    } else if (location.pathname === "/news") {
      setPageBgClass(
        "dark:from-news-bg-theme min-h-screen bg-gradient-to-br from-lime-100 to-white px-4 text-black md:px-15 dark:to-black dark:text-white py-3",
      );
    } else if (location.pathname === "/") {
      setPageBgClass(
        "from-blue-900 md:px-15 min-h-screen bg-radial px-4 py-3 text-black to-black text-white",
      );
    } else {
      setPageBgClass(
        "min-h-screen bg-gray-100 dark:bg-gray-800 px-4 md:px-15 py-3",
      );
    }
  }, [location.pathname]);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${darkTheme ? "dark" : null} ${pageBgClass}`}
    >
      <NavBar
        theme={toggleTheme}
        darkTheme={darkTheme}
        clearTheme={clearTheme}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
