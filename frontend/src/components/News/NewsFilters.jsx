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
          className={`text-2xs cursor-pointer rounded-xl px-6 py-1 ${
            activeFilter === filter.id
              ? "bg-news-theme md:w-50 font-[1000] text-black"
              : "border hover:bg-green-200 hover:text-black"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default NewsFilters;
