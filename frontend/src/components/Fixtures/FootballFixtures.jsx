// import React from "react";

const FootballFixtures = ({ data }) => {
  const { fixture, teams, league, score } = data;

  let statusBg = "bg-gray-400";
  let statusText = fixture.status?.short || "VS";

  if (statusText === "LIVE") {
    statusBg = "bg-green-500";
  } else if (statusText === "FT") {
    statusBg = "bg-red-500";
    statusText = "Finished";
  } else if (statusText === "NS") {
    statusBg = "bg-blue-500";
    statusText = "Upcoming";
  }

  return (
    <div className="bg-fixtures-cards-bg hover:shadow-fixtures-bg-theme hover:scale-101 hover:dark:shadow-fixtures-cards-bg relative transform overflow-hidden rounded-t-2xl shadow-xl transition duration-300 hover:shadow-2xl">
      {/* Gradient Header */}
      <div className="bg-fixtures-theme p-4">
        <h3 className="text-center text-lg font-bold text-black">
          {league.name}
        </h3>
      </div>

      {/* Main Card Body */}
      <div className="relative bg-opacity-90 p-6 backdrop-blur-sm">
        {/* Floating Status Badge */}
        <div className="absolute right-4 top-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold text-white ${statusBg}`}
          >
            {statusText}
          </span>
        </div>

        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex flex-grow flex-col items-center">
            {" "}
            <img
              src={teams.home.logo}
              alt={teams.home.name}
              className="h-16 w-16 object-contain"
            />
            <p className="mt-2 text-center text-sm font-semibold text-gray-800">
              {teams.home.name}
            </p>
          </div>

          {/* Match Info */}
          <div className="flex flex-col items-center justify-center">
            {" "}
            <p className="text-2xl font-extrabold text-gray-800">
              {score && score.fulltime
                ? `${score.fulltime.home} - ${score.fulltime.away}`
                : "VS"}
            </p>
            {statusText === "Upcoming" && fixture.fixture?.date && (
              <p className="mt-1 text-xs text-gray-500">
                {new Date(fixture.fixture.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-grow flex-col items-center">
            {" "}
            <img
              src={teams.away.logo}
              alt={teams.away.name}
              className="h-16 w-16 object-contain"
            />
            <p className="mt-2 text-center text-sm font-semibold text-gray-800">
              {teams.away.name}
            </p>
          </div>
        </div>

        {/* Venue Information */}
        <div className="mt-4 text-center text-xs italic text-gray-500">
          {fixture.venue?.name || "No Venue"}
        </div>
      </div>
    </div>
  );
};

export default FootballFixtures;
