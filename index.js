const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetchArticles = require("./scraper");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

let articlesCache = [];

app.post("/scrape", async (req, res) => {
  const { topic } = req.body;
  console.log(`Received scraping request for topic: ${topic}`);
  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }
  try {
    const articles = await fetchArticles(topic);
    articlesCache = articles;
    res.json(articles);
  } catch (error) {
    console.error("Error during scraping:", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

app.get("/articles", (req, res) => {
  res.json(articlesCache);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
