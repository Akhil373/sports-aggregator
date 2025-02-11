import { useState } from "react";

const NewsFilters = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    { id: "All", label: "All" },
    { id: "Football", label: "Football" },
    { id: "Basketball", label: "Basketball" },
    { id: "Cricket", label: "Cricket" },
  ];

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="mb-5 flex gap-3 py-4">
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

export default NewsFilters;
