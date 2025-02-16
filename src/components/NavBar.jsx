import { Award, LucideAlignRight, MoonIcon, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ theme, darkTheme }) => {
  const [openNavbar, setOpenNavbar] = React.useState(false);

  const togglenavbar = () => {
    setOpenNavbar(!openNavbar);
  };

  return (
    <>
      <div
        className={`${openNavbar ? "" : "sticky top-0 z-5"} hidden gap-12 overflow-hidden py-3 backdrop-blur-lg lg:flex`}
      >
        <Link to="/" className="px-2">
          <Award />
        </Link>
        <div className="flex w-full items-center justify-center gap-12 transition-all duration-300">
          <Link to="/">Home</Link>
          <Link to="/">Latest News</Link>
          <Link to="/fixtures">Fixtures</Link>
          <Link to="/leaderboards">League Table</Link>
        </div>
        <button
          className="cursor-pointer px-2 text-nowrap transition-all duration-500"
          onClick={theme}
        >
          {darkTheme ? (
            <MoonIcon className="fill-white" />
          ) : (
            <MoonIcon className="fill-black" />
          )}
        </button>
      </div>

      <button
        className="absolute top-5 right-5 cursor-pointer rounded-[50%] border p-3 lg:hidden dark:text-white"
        onClick={theme}
      >
        {darkTheme ? (
          <MoonIcon className="fill-white" />
        ) : (
          <MoonIcon className="fill-black" />
        )}
      </button>

      <div className="lg:hidden">
        <button
          className="fixed right-6 bottom-6 z-50 rounded-full bg-black p-4 shadow-lg transition-all"
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
                to="/"
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
