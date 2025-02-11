import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
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
import NavBar from "../components/NavBar";

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterChange, setFilterChange] = useState("basketball");

  function getYesterdayDateString() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate());
    return yesterday.toISOString().slice(0, 10);
  }

  const yesterdayString = getYesterdayDateString();

  const handleFilterChange = (selectedFilter) => {
    setFilterChange(selectedFilter.toLowerCase());
  };

  useEffect(() => {
    const loadFixtures = async () => {
      try {
        setFixtures([]);
        if (filterChange === "football") {
          const data = await fetchFootballFixtures("football", yesterdayString);
          setFixtures(data?.response || []);
        } else if (filterChange === "basketball") {
          const data = await fetchBasketballFixtures(
            "basketball",
            yesterdayString,
          );
          setFixtures(data?.response || []);
        } else {
          const data = await fetchCricketFixtures(yesterdayString);
          setFixtures(data?.response || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFixtures();
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
      <div className="flex h-screen items-center justify-center">
        <motion.img
          src="./src/assets/basketball.svg"
          alt="loading..."
          className="w-25"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            repeat: Infinity,
          }}
        />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-15 py-5">
      <NavBar />
      <div className="flex bg-gradient-to-b from-white to-[#ca1f01] bg-clip-text pt-15 text-2xl font-medium text-transparent sm:text-5xl">
        Fixtures
      </div>

      <FixturesFilter onFilterChange={handleFilterChange} />

      <AnimatePresence mode="wait">
        <motion.div
          key={filterChange}
          initial={{ opacity: 0, transform: "translateY(100px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={{ opacity: 0, transform: "translateY(100px)" }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-10 py-10 lg:px-50"
        >
          {checkLength()
            .map((response) => {
              if (filterChange === "football") {
                return response.fixture ? (
                  <FootballFixtures key={response.fixture.id} data={response} />
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
    </div>
  );
};

export default Fixtures;
