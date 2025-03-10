const BasketballFixtures = ({ data }) => {
  const { arena, date, league, scores, status, teams } = data;

  let statusBg = "bg-gray-400";
  let statusText = status.long;

  if (status.short === 3) {
    statusBg = "bg-red-500";
  } else if (new Date(date.start) > new Date()) {
    statusBg = "bg-blue-500";
    statusText = "Upcoming";
  } else {
    statusBg = "bg-green-500";
    statusText = `Q${status.period?.current || 1}`;
  }

  return (
    <div className="bg-fixtures-cards-bg relative transform overflow-hidden rounded-t-2xl shadow-xl transition duration-300 hover:scale-105 hover:shadow-xl">
      {/* Gradient Header */}
      <div className="bg-fixtures-theme p-4">
        <h3 className="text-center text-lg font-bold text-black">
          {league.toUpperCase()} {new Date(date.start).toLocaleDateString()}
        </h3>
      </div>

      {/* Main Card Body */}
      <div className="bg-opacity-90 relative p-6 backdrop-blur-sm">
        {/* Floating Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold text-white ${statusBg}`}
          >
            {statusText}
          </span>
        </div>

        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex flex-grow flex-col items-center">
            <img
              src={teams.home.logo}
              alt={teams.home.name}
              className="h-16 w-16 object-contain"
            />
            <p className="mt-2 text-center text-sm font-semibold text-gray-800">
              {teams.home.nickname}
            </p>
          </div>

          {/* Match Info */}
          <div className="flex flex-col items-center justify-center">
            {status.short === 3 ? (
              <>
                <p className="text-2xl font-extrabold text-gray-800">
                  {scores.home.points} - {scores.visitors.points}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {scores.home.linescore.join(" - ")} ||
                  {scores.visitors.linescore.join(" - ")}
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-extrabold text-gray-800">VS</p>
                <p className="mt-1 text-xs text-gray-500">
                  {new Date(date.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-grow flex-col items-center">
            <img
              src={teams.visitors.logo}
              alt={teams.visitors.name}
              className="h-16 w-16 object-contain"
            />
            <p className="mt-2 text-center text-sm font-semibold text-gray-800">
              {teams.visitors.nickname}
            </p>
          </div>
        </div>

        {/* Venue Information */}
        <div className="mt-4 text-center text-xs text-gray-500 italic">
          {arena.name} - {arena.city}, {arena.state}
        </div>
      </div>
    </div>
  );
};

export default BasketballFixtures;
