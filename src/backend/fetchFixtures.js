import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { database, get, ref, remove, set } from "./firebase.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: "../../.env" });

const apiKey = process.env.SPORTS_APP;
const cricket_apiKey = process.env.CRICKET_APP;
let dataSource = "";

const API_ENDPOINTS = {
  football: process.env.FIXTURES_FOOTBALL_ENDPOINT,
  cricket: process.env.FIXTURES_CRICKET_ENDPOINT,
  basketball: process.env.FIXTURES_BASKETBALL_ENDPOINT,
};

const API_HOSTS = {
  football: "v3.football.api-sports.io",
  basketball: "v2.nba.api-sports.io",
};

const cleanupPreviousDate = async (sport, date) => {
  const today = new Date(date);
  const todayString = today.toISOString().split("T")[0];

  const sportFixturesRef = ref(database, `${sport}Fixtures`);

  console.log(`Cleaning up other dates fixtures data for sport: ${sport}`);

  const snapshot = await get(sportFixturesRef);

  if (snapshot.exists()) {
    const dates = Object.keys(snapshot.val());

    console.log(dates);

    for (const dateKey of dates) {
      console.log(`Comparing dates: ${dateKey} !== ${todayString}`);

      if (dateKey !== todayString) {
        const dateRef = ref(database, `${sport}Fixtures/${dateKey}`);
        console.log(`Removing fixtures data for: ${sport}/${dateKey}`);
        await remove(dateRef);
        console.log(`Removed fixtures data for ${dateKey} from Firebase`);
      } else {
        console.log(`Skipping today's fixtures data: ${sport}/${dateKey}`);
      }
    }
    console.log("Cleanup of other dates fixtures completed for sport:", sport);
  } else {
    console.log(`No fixtures data exists for sport: ${sport} to cleanup.`);
  }
};

export const fetchFixtures = async (sport, date) => {
  try {
    const dbRef = ref(database, `${sport}Fixtures/${date}`);

    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      console.log("snapshot found! Fetching from firebase realtime db.");

      await cleanupPreviousDate(sport, date);
      dataSource = "firebase";

      return { sportsData: snapshot.val(), dataSource };
    } else {
      console.log("fetching directly from api");

      const apiUrl = `${API_ENDPOINTS[sport]}?date=${date}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-host": API_HOSTS[sport],
          "x-rapidapi-key": apiKey,
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const apiData = await response.json();
      const processedData = apiData;
      await set(dbRef, processedData);
      dataSource = "api";

      return { sportsData: processedData, dataSource };
    }
  } catch (error) {
    console.error("Error:", error);

    throw error;
  }
};

export const fetchCricketFixtures = async (date) => {
  try {
    const dbRef = ref(database, `CricketFixtures/${date}`);

    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      console.log("snapshot found! Fetching from firebase realtime db.");

      await cleanupPreviousDate("Cricket", date);
      dataSource = "firebase";

      return { sportsData: snapshot.val(), dataSource };
    } else {
      console.log("fetching directly from api");

      const apiUrl = `${API_ENDPOINTS["cricket"]}?apikey=${cricket_apiKey}&offset=0`;

      const response = await fetch(apiUrl);

      if (!response.ok) throw new Error("Network response was not ok");

      const apiData = await response.json();

      const processedData = {
        response: apiData.data,
      };
      await set(dbRef, processedData);
      dataSource = "api";

      return { sportsData: processedData, dataSource };
    }
  } catch (error) {
    console.error("Error:", error);

    throw error;
  }
};
