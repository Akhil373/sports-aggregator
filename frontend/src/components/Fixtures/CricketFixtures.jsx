const CricketFixtures = ({ data }) => {
  const { date, name, teams, venue } = data;

  return (
    <div className="bg-fixtures-cards-bg hover:shadow-fixtures-bg-theme hover:scale-101 hover:dark:shadow-fixtures-cards-bg relative transform overflow-hidden rounded-t-2xl shadow-xl transition duration-300 hover:shadow-2xl">
      {/* Gradient Header */}
      <div className="bg-fixtures-theme p-4">
        <h3 className="text-center text-lg font-bold text-black">{name}</h3>
      </div>

      {/* Main Card Body */}
      <div className="relative bg-opacity-90 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex flex-grow flex-col items-center">
            <p className="text-2sm mt-2 text-center font-semibold text-gray-800">
              {teams[0]}
            </p>
          </div>

          {/* Match Info */}
          <div className="flex flex-col items-center">
            <p className="text-2xl font-extrabold text-gray-800">VS</p>
            {date && (
              <p className="mt-1 text-xs text-gray-500">
                {new Date(date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-grow flex-col items-center">
            <p className="text-2sm mt-2 text-center font-semibold text-gray-800">
              {teams[1]}
            </p>
          </div>
        </div>

        {/* Venue Information */}
        <div className="mt-4 text-center text-xs italic text-gray-500">
          {venue}
        </div>
      </div>
    </div>
  );
};

export default CricketFixtures;
