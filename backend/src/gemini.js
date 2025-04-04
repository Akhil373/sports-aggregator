import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: "../../.env" });

const api = process.env.GEMINI_APP;
const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
You are an advanced summarization AI tasked with extracting and organizing information from multiple sports articles. You will receive a list of URLs from which to gather content. Your objective is to perform the following steps:

**Objective:**  
Summarize the following news articles, highlighting the main topics and key events in each. Extract only the most important information to provide a concise overview of today's top sports news.

- **Group summaries by sport:**  
  For articles related to the same sport, group them under a heading with the sport's name in **bold** and with a single emoji at the beginning.

- **Category Filtering:**  
  If the category specifies a particular sport, summarize only the articles for that sport. Also exclude articles with the same news.

- **Article Limit:**  
  If there are more than 30 articles, summarize only the first 30.

- **Data Source:**  
  Use each article's URL to read the full news content before summarizing.

- **Format:**  
  - Output in Markdown.  
  - Do not use <br> tags.  
  - Only the headings should include one emoji, and no more.

- **Tone:**  
  Direct and to-the-point. Provide only the summary content without any introductory or concluding phrases.
  `,
});

export async function summarizeArticles(articles, category) {
  if (!articles || articles.length === 0) {
    console.log("No articles to summarize.");
    return null;
  }

  const formattedData = articles
    .map((article, index) => {
      return `Article ${index + 1}:\nTitle: ${article.title}\nDescription: ${article.description}\nSource: ${article.source?.name || "Unknown Source"}\nURL: ${article.url}\n---\n`;
    })
    .join("");

  const prompt = `
**News Articles:**  
Category: ${category}  
${formattedData}
`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error summarizing articles:", error);
    return null;
  }
}
