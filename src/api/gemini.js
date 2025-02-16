import { GoogleGenerativeAI } from "@google/generative-ai";

const api = import.meta.env.VITE_GEMINI_APP;
const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite-preview-02-05",
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
**Objective:** Please summarize the following news articles, highlighting the main topics and key events in each. Focus on extracting the most important information from each article to provide a concise overview of today's top sports news. Present the summary in a very easy-to-read way for users, visually pleasing and easy to understand and skim through. All summary related to similar sport must be under heading of the common sport name. The title of the sport must be clearly visible with good spacing and bold text. If the cateogry specifies any specific sport, then only summary articles from that category. If the articles are too many, just summarize first 30 articles.

**Format:** Markdown. Don't include <br> tags. Only the headings should have 1 emoji & no more. Make sure it's clear to the user about different summary lines and not all the lines cramped together. 

**Tone:** Direct and to-the-point. Provide only the summary, without any introductory or concluding phrases.

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
