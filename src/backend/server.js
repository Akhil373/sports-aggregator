import cors from "cors";
import "dotenv/config";
import express from "express";
import getNewsData from "../backend/fetchNews.js";
import { fetchCricketFixtures, fetchFixtures } from "./fetchFixtures.js";
import { summarizeArticles } from "./gemini.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/api/news", async (req, res) => {
  const { category } = req.query;
  const validCategories = ["basketball", "cricket", "football", "all"];
  const selectedCategory =
    category && validCategories.includes(category.toLowerCase())
      ? category.toLowerCase()
      : "all";

  try {
    const newsResult = await getNewsData(selectedCategory);
    res.status(200).json(newsResult);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({
      error: "Failed to fetch news data",
      message: err.message,
    });
  }
});

app.post("/api/summary", async (req, res) => {
  const { articles, category } = req.body;

  if (!articles || !Array.isArray(articles) || articles.length === 0) {
    return res.status(400).json({
      error: "Articles array is required and cannot be empty",
    });
  }

  if (!category) {
    return res.status(400).json({
      error: "Category is required",
    });
  }

  try {
    const summary = await summarizeArticles(articles, category);
    if (summary) {
      res.status(200).json({ summary });
    } else {
      res.status(500).json({ error: "Failed to generate summary" });
    }
  } catch (error) {
    console.error("Error summarizing articles:", error);
    res.status(500).json({
      error: "Error summarizing articles",
      message: error.message,
    });
  }
});

app.get("/api/fixtures", async (req, res) => {
  const { sport, date } = req.query;
  const validSports = ["football", "basketball", "cricket"];

  if (!date) {
    return res.status(400).json({
      error: "Date parameter is required",
    });
  }

  const selectedSport =
    sport && validSports.includes(sport.toLowerCase())
      ? sport.toLowerCase()
      : null;

  if (!selectedSport) {
    return res.status(400).json({
      error: "Valid sport parameter is required",
    });
  }

  try {
    let fixturesData;

    switch (selectedSport) {
      case "football":
        fixturesData = await fetchFixtures("football", date);
        break;
      case "basketball":
        fixturesData = await fetchFixtures("basketball", date);
        break;
      case "cricket":
        fixturesData = await fetchCricketFixtures(date);
        break;
      default:
        throw new Error("Invalid sport category");
    }

    res.status(200).json(fixturesData);
  } catch (err) {
    console.log(err);
    res.status(200).json({
      error: "Failed to fetch fixtures data",
      message: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
