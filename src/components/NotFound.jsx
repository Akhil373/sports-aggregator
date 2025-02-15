import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const NotFound = () => {
  return (
    <div className="h-screen overflow-y-hidden px-15 text-white">
      <NavBar />
      <div className="flex h-screen items-center justify-center">
        <img src="src/assets/404.png" alt="404" className="w-1/4" />
        <div>
          <h1 className="text-4xl font-bold"> OOPS! PAGE NOT FOUND.</h1>
          <p className="text-center text-gray-500">
            We searched Monstropolis and beyond, but this page is nowhere to be
            found!
          </p>
          <Link to="/">
            <button className="mt-10 cursor-pointer rounded-md bg-green-500 px-4 py-2 text-white hover:bg-[#669423]">
              Go back to home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
