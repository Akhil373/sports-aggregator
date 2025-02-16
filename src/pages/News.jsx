import { useEffect, useState } from "react";
import { getNewsData } from "../api/fetchNews.js";
import NavBar from "../components/NavBar";
import NewsCards from "../components/News/NewsCards";
import NewsFilters from "../components/News/NewsFilters";
import Notification from "../components/Notification.jsx";

const News = () => {
  const [filterChange, setFilterChange] = useState("all");
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState("");

  const handleFilterChange = (selectedFilter) => {
    setFilterChange(selectedFilter);
    console.log(selectedFilter);
  };

  useEffect(() => {
    setLoading(true);
    getNewsData(filterChange)
      .then((response) => {
        const articles = Array.isArray(response.newsData)
          ? response.newsData
          : response.newsData?.news || [];
        setNewsItems(articles);
        setDataSource(response.dataSource);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading news:", error);
        setLoading(false);
        setDataSource("Error");
      });
  }, [filterChange]);

  console.log(dataSource);

  return (
    <>
      <div className="dark:from-news-bg-theme min-h-screen bg-gradient-to-br from-lime-100 to-white px-4 py-5 text-black md:px-15 dark:to-black dark:text-white">
        <NavBar />
        <div className="from-news-theme flex dark:bg-gradient-to-t  dark:bg-clip-text pt-5 text-5xl font-medium dark:text-transparent lg:pt-15 dark:to-yellow-400">
          <p>Latest News.</p>
        </div>
        <Notification source={dataSource} />
        <NewsFilters onFilterChange={handleFilterChange} />
        <NewsCards
          newsItems={newsItems}
          loading={loading}
          selectedFilter={filterChange}
        />
      </div>
    </>
  );
};

export default News;
