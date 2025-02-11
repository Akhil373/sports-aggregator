import React, { useState } from "react";

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
    <div className="flex gap-3 py-4">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className={`text-2xs rounded-full px-6 py-1 transition-all ${
            activeFilter === filter.id
              ? "border border-[##ca1f01] text-[#ca1f01]"
              : "border text-gray-700 hover:scale-105 hover:bg-red-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FixturesFilter;
