import { database, get, ref, remove, set } from "./firebase";

const news_apiKey = import.meta.env.VITE_NEWS_APP;
let dataSource = "";

const cleanupPreviousDateData = async (category, date) => {
  const prevDate = new Date(date);
  prevDate.setDate(prevDate.getDate() - 1);
  const prevDateString = prevDate.toISOString().split("T")[0];

  const prevDateRef = ref(database, `newsData/${category}/${prevDateString}`);
  console.log(`${category}/${prevDateString}`);
  const prevSnapshot = await get(prevDateRef);
  if (prevSnapshot.exists()) {
    await remove(prevDateRef);
    console.log("Removed previous news data from Firebase");
  }
};

export async function getNewsData(category) {
  try {
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const dbRef = ref(database, `newsData/${category}/${todayDate}`);
    console.log(`newsData/${category}/${todayDate}`);
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
          `https://newsapi.org/v2/top-headlines?category=sports&apiKey=${news_apiKey}`,
        );
      } else if (category === "football") {
        response = await fetch(
          `https://newsapi.org/v2/everything?q=(football OR soccer OR premier league OR champions league OR fifa)&apiKey=${news_apiKey}`,
        );
      } else if (category === "basketball") {
        response = await fetch(
          `https://newsapi.org/v2/everything?q=(basketball OR nba OR wnba OR fiba)&apiKey=${news_apiKey}`,
        );
      } else if (category === "cricket") {
        response = await fetch(
          `https://newsapi.org/v2/everything?q=(cricket OR ipl OR test match OR t20)&apiKey=${news_apiKey}`,
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
