import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center md:h-auto">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 md:flex-row">
        <div className="order-1 flex flex-shrink-0 flex-col items-center md:order-none md:mr-8">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-auto max-w-full md:max-w-md xl:max-w-lg"
          />
        </div>

        <div className="flex-grow text-center md:max-w-3xl md:text-left">
          <h1 className="from-news-theme to-fixtures-theme w-fit bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            Never Miss a Game.
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-neutral-200 md:mx-0">
            Stay updated with all your favorite sports events in one place.
          </p>
          <div className="mt-4 flex flex-col items-center gap-10 sm:flex-row md:items-start">
            <Link
              className="text-nowrap rounded-lg px-4 py-2 font-medium text-white bg-blue-700 transition-colors hover:bg-blue-700"
              to={"/news"}
            >
              Latest News
            </Link>
            <Link
              className="rounded-lg px-4 py-2 font-medium text-white bg-blue-700 transition-colors hover:bg-blue-700"
              to={"/fixtures"}
            >
              Fixtures
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
