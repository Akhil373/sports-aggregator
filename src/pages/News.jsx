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
      <div className="from-news-bg-theme min-h-screen bg-gradient-to-br to-black px-4 py-5 text-white md:px-15">
        <NavBar />
        <div className="from-news-theme flex bg-gradient-to-t to-yellow-400 bg-clip-text pt-5 text-5xl font-medium text-transparent lg:pt-15">
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
