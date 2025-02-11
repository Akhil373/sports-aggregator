import { useState } from "react";
import NavBar from "../components/NavBar";
import NewsCards from "../components/News/NewsCards";
import NewsFilters from "../components/News/NewsFilters";

const News = () => {
  const [filterChange, setFilterChange] = useState("All");

  const handleFilterChange = (selectedFilter) => {
    setFilterChange(selectedFilter.toLowerCase());
    console.log(selectedFilter);
  };

  return (
    <>
      <div className="px-15 py-5">
        <NavBar></NavBar>
        <div className="flex bg-gradient-to-b from-white to-[#ca1f01] bg-clip-text pt-15 text-2xl font-medium text-transparent sm:text-5xl">
          Latest news
        </div>
        <NewsFilters onFilterChange={handleFilterChange} />
        <NewsCards selectedFilter={filterChange} />
      </div>
    </>
  );
};

export default News;
