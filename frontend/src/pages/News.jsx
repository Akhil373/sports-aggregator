import axios from "axios";
import { useEffect, useState } from "react";
import NewsCards from "../components/News/NewsCards";
import NewsFilters from "../components/News/NewsFilters";
import Summary from "../components/News/Summary.jsx";
import Notification from "../components/Notification.jsx";

const News = () => {
  const [filterChange, setFilterChange] = useState("all");
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState("");

  const handleFilterChange = (selectedFilter) => {
    setFilterChange(selectedFilter);
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/news?category=${filterChange}`,
        );

        const articles = Array.isArray(data.newsData)
          ? data.newsData
          : data.newsData?.news || [];
        setNewsItems(articles);
        setDataSource(data.dataSource);
      } catch (error) {
        console.error("Error loading news:", error);
        setDataSource("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [filterChange]);

  return (
    <>
      <div className="from-news-theme lg:pt-15 flex pt-5 text-5xl font-medium dark:bg-gradient-to-t dark:to-yellow-400 dark:bg-clip-text dark:text-transparent">
        <p>Latest News.</p>
      </div>
      <Notification source={dataSource} />
      <NewsFilters onFilterChange={handleFilterChange} />

      <Summary data={newsItems} category={filterChange} />
      <NewsCards
        newsItems={newsItems}
        loading={loading}
        selectedFilter={filterChange}
        slice={30}
      />
    </>
  );
};

export default News;
