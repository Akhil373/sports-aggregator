import { useState } from "react";

const NewsFilters = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "football", label: "Football" },
    { id: "basketball", label: "Basketball" },
    { id: "cricket", label: "Cricket" },
  ];

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="mb-5 flex flex-wrap gap-3 py-4">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className={`text-2xs rounded-full px-6 py-1 transition-all ${
            activeFilter === filter.id
              ? "bg-news-theme font-[1000] text-black md:w-50"
              : "border hover:bg-green-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default NewsFilters;
