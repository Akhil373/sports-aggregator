import { LucideAlignLeft, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [openNavbar, setOpenNavbar] = React.useState(false);

  const togglenavbar = () => {
    setOpenNavbar(!openNavbar);
  };

  return (
    <>
      <div
        className={`${openNavbar ? null : "sticky top-0 z-50"} hidden gap-12 overflow-hidden py-3 backdrop-blur-lg lg:flex`}
      >
        <button className="hover:cursor-pointer" onClick={togglenavbar}>
          <LucideAlignLeft></LucideAlignLeft>
        </button>
        <div
          className={`flex gap-12 transition-all duration-300 ${
            openNavbar
              ? "z-[-2] -translate-x-full opacity-0"
              : "z-0 translate-x-0 opacity-100"
          }`}
        >
          <Link to="/">Home</Link>
          <Link to="/">Latest News</Link>
          <Link to="/fixtures">Fixtures</Link>
          <Link to="/leaderboards">Leaderboards</Link>
        </div>
      </div>

      <div className="flex-col justify-end md:flex lg:hidden">
        <button className="hover:cursor-pointer" onClick={togglenavbar}>
          {openNavbar ? <X></X> : <LucideAlignLeft></LucideAlignLeft>}
        </button>
      </div>

      {openNavbar && (
        <div className="bg-background/80 fixed right-0 z-20 flex h-screen w-full flex-col p-12 text-xl backdrop-blur-sm lg:hidden">
          <div className="flex flex-col gap-16 p-12 text-center tracking-wide underline">
            <Link to="/" className="bg-[#fbe1da]">
              Home
            </Link>
            <Link to="/" className="bg-[#fbe1da]">
              Latest News
            </Link>
            <Link to="/fixtures" className="bg-[#fbe1da]">
              Fixtures
            </Link>
            <Link to="/leaderboards" className="bg-[#fbe1da]">
              Leaderboards
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
