import { useState } from "react";

const FixturesFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("Basketball");

  const filters = [
    { id: "Football", label: "Football" },
    { id: "Basketball", label: "Basketball" },
    { id: "Cricket", label: "Cricket" },
  ];

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="flex flex-wrap gap-3 py-4">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className={`text-2xs rounded-full px-6 py-1 transition-all duration-500 ${
            activeFilter === filter.id
              ? "border bg-[#ed2f85] font-[1000] text-black md:w-50"
              : "border hover:scale-105 hover:bg-red-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FixturesFilter;
