import { useState } from "react";
import NavBar from "../components/NavBar";
import NewsCards from "../components/News/NewsCards";
import NewsFilters from "../components/News/NewsFilters";

const News = () => {
  const [filterChange, setFilterChange] = useState("all");

  const handleFilterChange = (selectedFilter) => {
    setFilterChange(selectedFilter);
    console.log(selectedFilter);
  };

  return (
    <>
      <div className="px-4 py-5 text-white md:px-15">
        <NavBar></NavBar>
        <div className="from-news-theme flex bg-gradient-to-t to-yellow-400 bg-clip-text pt-5 text-5xl font-medium text-transparent lg:pt-15">
          <p>Latest News.</p>
        </div>
        <NewsFilters onFilterChange={handleFilterChange} />
        <NewsCards selectedFilter={filterChange} />
      </div>
    </>
  );
};

export default News;
