import { useEffect, useState } from "react";
import { getNewsData } from "../api/fetchNews.js";
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
      <div className="from-news-theme flex pt-5 text-5xl font-medium lg:pt-15 dark:bg-gradient-to-t dark:to-yellow-400 dark:bg-clip-text dark:text-transparent">
        <p>Latest News.</p>
      </div>
      <Notification source={dataSource} />
      <NewsFilters onFilterChange={handleFilterChange} />
      <NewsCards
        newsItems={newsItems}
        loading={loading}
        selectedFilter={filterChange}
      />
    </>
  );
};

export default News;
