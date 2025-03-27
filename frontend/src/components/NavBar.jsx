import {
  Award,
  LaptopMinimal,
  LaptopMinimalCheckIcon,
  LucideAlignRight,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ThemeToggle = ({ darkTheme }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="theme-toggle-icon"
    >
      <g className="icon-container">
        {/* Sun icon */}
        <g className={`sun ${darkTheme ? "dark-mode" : "light-mode"}`}>
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3" style={{ "--i": "0" }}></line>
          <line x1="12" y1="21" x2="12" y2="23" style={{ "--i": "4" }}></line>
          <line
            x1="4.22"
            y1="4.22"
            x2="5.64"
            y2="5.64"
            style={{ "--i": "1" }}
          ></line>
          <line
            x1="18.36"
            y1="18.36"
            x2="19.78"
            y2="19.78"
            style={{ "--i": "5" }}
          ></line>
          <line x1="1" y1="12" x2="3" y2="12" style={{ "--i": "2" }}></line>
          <line x1="21" y1="12" x2="23" y2="12" style={{ "--i": "6" }}></line>
          <line
            x1="4.22"
            y1="19.78"
            x2="5.64"
            y2="18.36"
            style={{ "--i": "3" }}
          ></line>
          <line
            x1="18.36"
            y1="5.64"
            x2="19.78"
            y2="4.22"
            style={{ "--i": "7" }}
          ></line>
        </g>

        {/* Moon icon */}
        <g className={`moon ${darkTheme ? "dark-mode" : "light-mode"}`}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </g>
      </g>
    </svg>
  );
};

const NavBar = ({ theme, darkTheme, clearTheme }) => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [systemTheme, setSystemTheme] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!darkTheme) {
      setSystemTheme(false);
    }
  }, [darkTheme]);

  const handleSystemThemeClick = () => {
    clearTheme();
    setSystemTheme(true);
  };

  const togglenavbar = () => {
    setOpenNavbar(!openNavbar);
  };

  return (
    <>
      <style>{`
        .theme-toggle-icon {
          cursor: pointer;
          width: 30px;
          height: 30px;
          transform-style: preserve-3d;
          perspective: 500px;
        }

        .icon-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .sun {
          opacity: 1;
          transform-origin: center;
          transition:
            opacity 0.5s ease,
            transform 0.5s ease;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .sun circle {
          fill: #ffcc33;
          transition:
            fill 0.5s ease,
            transform 0.5s ease;
        }

        .sun line {
          stroke: black;
          transition: all 0.5s ease;
          stroke-width: 2;
          stroke-linecap: round;
        }

        .moon {
          opacity: 0;
          transform-origin: center;
          transition:
            opacity 0.5s ease,
            transform 0.5s ease;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .moon path {
          fill: #c4c9d1;
          stroke: #c4c9d1;
          transition:
            fill 0.5s ease,
            stroke 0.5s ease,
            transform 0.5s ease;
        }

        .sun.light-mode {
          opacity: 1;
          transform: rotate(0) scale(1);
        }

        .sun.light-mode circle {
          transform: scale(1);
        }

        .sun.light-mode line {
          transform: scale(1);
          stroke-width: 2;
        }

        .moon.light-mode {
          opacity: 0;
          transform: rotate(-90deg) scale(0.5);
        }

        .sun.dark-mode {
          opacity: 0;
          transform: rotate(90deg) scale(0.5);
        }

        .sun.dark-mode circle {
          transform: scale(0.5);
        }

        .sun.dark-mode line {
          transform: scale(0);
          stroke-width: 0;
        }

        .moon.dark-mode {
          opacity: 1;
          transform: rotate(0) scale(1);
        }

        @keyframes rayPulse {
          0%,
          100% {
            stroke-width: 2;
          }
          50% {
            stroke-width: 2.5;
          }
        }

        .sun.light-mode line {
          animation: rayPulse 3s infinite ease-in-out;
          animation-delay: calc(var(--i) * 0.1s);
        }
      `}</style>

      <div
        className={`${openNavbar ? null : "z-5 sticky top-0"} hidden gap-12 overflow-hidden py-3 backdrop-blur-lg lg:flex dark:text-white`}
      >
        <Link to="/" className="px-2">
          <Award />
        </Link>
        <div className="flex w-full items-center justify-center gap-12 transition-all duration-300">
          <Link to="/">Home</Link>
          <Link to="/news">Latest News</Link>
          <Link to="/fixtures">Fixtures</Link>
        </div>
        {isHomePage ? null : (
          <>
            <button
              className="w-0.5 cursor-pointer"
              onClick={handleSystemThemeClick}
            >
              {systemTheme ? <LaptopMinimalCheckIcon /> : <LaptopMinimal />}
            </button>
            <button
              className="cursor-pointer text-nowrap px-2 transition-all duration-500"
              onClick={theme}
            >
              <ThemeToggle darkTheme={darkTheme} />
            </button>
          </>
        )}
      </div>

      {isHomePage ? null : (
        <button
          className="absolute right-5 top-5 cursor-pointer rounded-[50%] border p-3 lg:hidden dark:text-white"
          onClick={theme}
        >
          <ThemeToggle darkTheme={darkTheme} />
        </button>
      )}

      <div className="lg:hidden">
        <button
          className="fixed bottom-6 right-6 z-50 rounded-full bg-black p-4 shadow-lg transition-all"
          onClick={togglenavbar}
        >
          {openNavbar ? (
            <X size={32} className="animate-wiggle text-white" />
          ) : (
            <LucideAlignRight size={32} className="animate-wiggle text-white" />
          )}
        </button>

        <div
          className={`fixed inset-0 z-40 transition-all duration-300 ${openNavbar ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
            onClick={togglenavbar}
          />

          <div className="relative flex h-full w-full items-center justify-center">
            <div className="flex flex-col gap-y-6 text-xl tracking-wide">
              <Link
                to="/"
                className="rounded-xl bg-black p-4 font-extrabold text-white"
                onClick={togglenavbar}
              >
                Home
              </Link>
              <Link
                to="/news"
                className="rounded-xl bg-black p-4 font-extrabold text-white"
                onClick={togglenavbar}
              >
                Latest News
              </Link>
              <Link
                to="/fixtures"
                className="rounded-xl bg-black p-4 font-extrabold text-white"
                onClick={togglenavbar}
              >
                Fixtures
              </Link>
              <Link
                to="/leaderboards"
                className="rounded-xl bg-black p-4 font-extrabold text-white"
                onClick={togglenavbar}
              >
                Leaderboards
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
