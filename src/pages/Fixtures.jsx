import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  fetchBasketballFixtures,
  fetchCricketFixtures,
  fetchFootballFixtures,
} from "../api/fetchFixtures";
import {
  BasketballFixtures,
  CricketFixtures,
  FixturesFilter,
  FootballFixtures,
} from "../components/Fixtures";
import { default as FixturesLoadingSkeleton } from "../components/Fixtures/FixturesLoadingSkeleton";
import Notification from "../components/Notification";

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterChange, setFilterChange] = useState("football");
  const [noData, setNoData] = useState(false);
  const [dataSource, setDataSource] = useState("");

  function getYesterdayDateString() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate());
    return yesterday.toISOString().slice(0, 10);
  }

  const yesterdayString = getYesterdayDateString();

  const handleFilterChange = (selectedFilter) => {
    setFilterChange(selectedFilter);
  };

  const checkData = (items) => {
    if (items && items.response) {
      setNoData(false);
      setFixtures(items.response || []);
    } else {
      setNoData(true);
      setFixtures([]);
    }
  };

  useEffect(() => {
    const loadFixtures = async () => {
      try {
        setFixtures([]);
        if (filterChange === "football") {
          const data = await fetchFootballFixtures("football", yesterdayString);
          checkData(data.sportsData);
          setDataSource(data.dataSource);
        } else if (filterChange === "basketball") {
          const data = await fetchBasketballFixtures(
            "basketball",
            yesterdayString,
          );
          checkData(data.sportsData);
          setDataSource(data.dataSource);
        } else {
          const data = await fetchCricketFixtures(yesterdayString);
          checkData(data.sportsData);
          console.log(data.sportsData);
          setDataSource(data.dataSource);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFixtures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterChange]);

  const checkLength = () => {
    if (fixtures.length > 20) {
      return fixtures.slice(0, 20);
    } else {
      return fixtures;
    }
  };

  if (loading)
    return (
      <>
        <div className="text-fixtures-theme flex pt-5 text-5xl font-medium lg:pt-15">
          <p>Live Fixtures.</p>
        </div>
        <div className="flex flex-col gap-10 py-10 lg:px-50">
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <FixturesLoadingSkeleton key={index} />
            ))}
        </div>
      </>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="text-fixtures-theme flex pt-5 text-5xl font-medium lg:pt-15">
        <p>Live Fixtures.</p>
      </div>

      <Notification source={dataSource} />

      <FixturesFilter onFilterChange={handleFilterChange} />

      {noData ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl">No fixtures today :(</p>
          <img
            src="src/assets/no-fixtures.svg"
            className="h-auto w-1/2 max-w-full"
            alt="No fixtures"
          />
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filterChange}
            initial={{ opacity: 0, transform: "translateY(100px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(100px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-10 py-10 lg:px-50"
          >
            {checkLength()
              .map((response) => {
                if (filterChange === "football") {
                  return response.fixture ? (
                    <FootballFixtures
                      key={response.fixture.id}
                      data={response}
                    />
                  ) : null;
                }

                if (filterChange === "basketball") {
                  return response.id && response.league ? (
                    <BasketballFixtures key={response.id} data={response} />
                  ) : null;
                }

                return response.id ? (
                  <CricketFixtures key={response.id} data={response} />
                ) : null;
              })
              .filter(Boolean)}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Fixtures;
