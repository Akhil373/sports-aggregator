import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { database, get, ref, remove, set } from "./firebase.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: "../../.env" });

const news_apiKey = process.env.NEWS_APP;
let dataSource = "";

const cleanupPreviousDateData = async (category, date) => {
  const today = new Date(date);
  const todayString = today.toISOString().split("T")[0];

  const categoryRef = ref(database, `newsData/${category}`);

  console.log(`Cleaning up other dates data for category: ${category}`);

  const snapshot = await get(categoryRef);

  if (snapshot.exists()) {
    const dates = Object.keys(snapshot.val());

    for (const dateKey of dates) {
      if (dateKey !== todayString) {
        const dateRef = ref(database, `newsData/${category}/${dateKey}`);
        console.log(`Removing data for: ${category}/${dateKey}`);
        await remove(dateRef);
        console.log(`Removed data for ${dateKey} from Firebase`);
      } else {
        console.log(`Skipping today's data: ${category}/${dateKey}`);
      }
    }
    console.log("Cleanup of other dates completed for category:", category);
  } else {
    console.log(`No data exists for category: ${category} to cleanup.`);
  }
};

export default async function getNewsData(category) {
  try {
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const dbRef = ref(database, `newsData/${category}/${todayDate}`);
    console.log(`Checking Firebase: newsData/${category}/${todayDate}`);
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      console.log("Loading news from Firebase cache");
      await cleanupPreviousDateData(category, today);
      dataSource = "firebase";
      return { newsData: snapshot.val(), dataSource };
    } else {
      console.log("Fetching new news data from API");
      let response;
      if (category === "all") {
        response = await fetch(
          `${process.env.NEWS_ALL_ENDPOINT}&apiKey=${news_apiKey}`,
        );
      } else if (category === "football") {
        response = await fetch(
          `${process.env.NEWS_FOOTBALL_ENDPOINT}&apiKey=${news_apiKey}`,
        );
      } else if (category === "basketball") {
        response = await fetch(
          `${process.env.NEWS_BASKETBALL_ENDPOINT}&apiKey=${news_apiKey}`,
        );
      } else if (category === "cricket") {
        response = await fetch(
          `${process.env.NEWS_CRICKET_ENDPOINT}&apiKey=${news_apiKey}`,
        );
      } else {
        throw new Error(`Invalid category: ${category}`);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      dataSource = "api";

      await set(dbRef, data.articles);
      await cleanupPreviousDateData(category, today);
      return { newsData: data.articles, dataSource };
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}
