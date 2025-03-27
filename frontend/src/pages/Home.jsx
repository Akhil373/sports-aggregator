import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BasketballFixtures from "../components/Fixtures/BasketballFixtures";
import NewsCards from "../components/News/NewsCards";

const Home = () => {
  const [fixture, setFixture] = useState(null);
  const [news, setNews] = useState(null);

  function getYesterdayDateString() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate());
    return yesterday.toISOString().slice(0, 10);
  }

  const yesterdayString = getYesterdayDateString();

  useEffect(() => {
    let isMounted = true;

    const fetchFixture = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/fixtures?sport=basketball&date=${yesterdayString}`,
        );
        if (isMounted) {
          setFixture(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchNews = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/news?category=all`,
        );
        if (isMounted) {
          const articles = Array.isArray(data.newsData)
            ? data.newsData
            : data.newsData?.news || [];
          setNews(articles);
        }
      } catch (error) {
        console.error("Error loading news:", error);
      }
    };

    fetchNews();
    fetchFixture();

    return () => {
      isMounted = false;
    };
  }, [yesterdayString]);

  console.log(news);

  return (
    <div className="flex h-full flex-col items-center justify-center md:h-auto">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 md:flex-row">
        <div className="order-1 flex flex-shrink-0 flex-col items-center md:order-none md:mr-8">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-auto max-w-full md:max-w-md xl:max-w-lg"
          />
        </div>

        <div className="flex-grow text-center md:max-w-3xl md:text-left">
          <h1 className="from-news-theme to-fixtures-theme w-fit bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-6xl">
            Never Miss a Game.
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-neutral-200 md:mx-0">
            Stay updated with all your favorite sports events in one place.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-10">
        <div className="w-full max-w-md">
          <p className="text-center text-4xl font-bold text-blue-200">
            Latest News
          </p>
          <div className="flex justify-center p-4">
            {news?.[0] && <NewsCards newsItems={news} slice={1} />}
          </div>
          <div className="flex justify-center">
            <Link
              className="text-nowrap rounded-lg bg-blue-700 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              to={"/news"}
            >
              Latest News ↗️
            </Link>
          </div>
        </div>

        <div className="w-full max-w-md">
          <p className="text-center text-4xl font-bold text-blue-200">
            Latest Match
          </p>
          <div className="flex justify-center p-4">
            {fixture?.sportsData?.response?.[0] && (
              <BasketballFixtures data={fixture.sportsData.response[0]} />
            )}
          </div>
          <div className="flex justify-center">
            <Link
              className="rounded-lg bg-blue-700 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              to={"/fixtures"}
            >
              View All Fixtures ↗️
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
