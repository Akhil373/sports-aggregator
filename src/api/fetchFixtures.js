import { database, get, ref, remove, set } from "./firebase";

const apiKey = "57682a67f7ffc62c5900e1fa9b153465";

const cricket_apiKey = "599a050c-edbf-4334-9c44-a90e206a5fed";

const API_ENDPOINTS = {
  football: "https://v3.football.api-sports.io/fixtures",

  cricket: "https://api.cricapi.com/v1/currentMatches",

  basketball: "https://v2.nba.api-sports.io/games",
};

const API_HOSTS = {
  football: "v3.football.api-sports.io",
  basketball: "v2.nba.api-sports.io",
};

const cleanupPreviousDate = async (sport, date) => {
  const prevDate = new Date(date);

  prevDate.setDate(prevDate.getDate() - 1);

  const prevDateString = prevDate.toISOString().split("T")[0];

  const prevDateRef = ref(database, `${sport}Fixtures/${prevDateString}`);

  const prevSnapshot = await get(prevDateRef);

  if (prevSnapshot.exists()) {
    await remove(prevDateRef);

    console.log("Removed previous fixtures data from Firebase");
  }
};

const fetchFixtures = async (sport, date) => {
  try {
    const dbRef = ref(database, `${sport}Fixtures/${date}`);

    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      console.log("snapshot found! Fetching from firebase realtime db.");

      await cleanupPreviousDate(sport, date);

      console.log(snapshot.val());

      return snapshot.val();
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

      return processedData;
    }
  } catch (error) {
    console.error("Error:", error);

    throw error;
  }
};

export const fetchFootballFixtures = (sport, date) => {
  return fetchFixtures(sport, date);
};

export const fetchBasketballFixtures = (sport, date) => {
  return fetchFixtures(sport, date);
};

export const fetchCricketFixtures = async (date) => {
  try {
    const dbRef = ref(database, `CricketFixtures/${date}`);

    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      console.log("snapshot found! Fetching from firebase realtime db.");

      await cleanupPreviousDate("sport", date);

      console.log(snapshot.val());

      return snapshot.val();
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

      return processedData;
    }
  } catch (error) {
    console.error("Error:", error);

    throw error;
  }
};
