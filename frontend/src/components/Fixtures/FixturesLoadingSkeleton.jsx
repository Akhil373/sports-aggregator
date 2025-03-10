const FixturesLoadingSkeleton = () => {
  return (
    <div className="relative transform animate-pulse overflow-hidden rounded-t-2xl bg-neutral-200/30 shadow-xl transition duration-300 dark:bg-neutral-700/30">
      {/* Gradient Header */}
      <div className="bg-gray-200/30 p-4 dark:bg-gray-700/30">
        <h3 className="text-center text-lg font-bold text-black">&nbsp;</h3>
      </div>

      {/* Main Card Body */}
      <div className="bg-opacity-90 relative p-6 backdrop-blur-sm">
        {/* Floating Status Badge */}
        <div className="absolute top-4 right-4 h-5 w-12 rounded-full bg-gray-200/30 px-3 py-1 dark:bg-gray-700/30"></div>

        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex flex-grow flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gray-200/30 dark:bg-gray-700/30"></div>
            <p className="mt-2 h-4 w-20 rounded-sm bg-gray-200/30 text-center text-sm font-semibold text-gray-800 dark:bg-gray-700/30">
              &nbsp;
            </p>
          </div>

          {/* Match Info */}
          <div className="flex flex-col items-center justify-center">
            <p className="h-6 w-10 rounded-sm bg-gray-200/30 text-2xl font-extrabold text-gray-800 dark:bg-gray-700/30">
              &nbsp;
            </p>
            <p className="mt-1 h-4 w-24 rounded-sm bg-gray-200/30 text-xs text-gray-500 dark:bg-gray-700/30">
              &nbsp;
            </p>
          </div>

          {/* Away Team */}
          <div className="flex flex-grow flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gray-200/30 dark:bg-gray-700/30"></div>
            <p className="mt-2 h-4 w-20 rounded-sm bg-gray-200/30 text-center text-sm font-semibold text-gray-800 dark:bg-gray-700/30">
              &nbsp;
            </p>
          </div>
        </div>

        {/* Venue Information */}
        <div className="mx-auto mt-4 h-4 w-3/4 rounded-sm bg-gray-200/30 text-center text-xs text-gray-500 italic dark:bg-gray-700/30">
          &nbsp;
        </div>
      </div>
    </div>
  );
};

export default FixturesLoadingSkeleton;
