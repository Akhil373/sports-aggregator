import { useState } from "react";

const FixturesFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("football");

  const filters = [
    { id: "football", label: "Football" },
    { id: "basketball", label: "Basketball" },
    { id: "cricket", label: "Cricket" },
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
          className={`text-2xs cursor-pointer rounded-xl px-6 py-1 ${
            activeFilter === filter.id
              ? "md:w-50 bg-[#ed2f85] font-[1000] text-black"
              : "border hover:bg-pink-100 hover:text-black"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FixturesFilter;
