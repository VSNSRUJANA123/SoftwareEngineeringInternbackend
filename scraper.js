const axios = require("axios");
require("dotenv").config();
async function fetchArticles(topic) {
  const apiKey = process.env.APIKEY;

  const url = `https://newsapi.org/v2/everything?q=${topic}&sortBy=publishedAt&language=en&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const articles = response.data.articles.slice(0, 5).map((article) => ({
      title: article.title,
      author: article.author,
      date: article.publishedAt,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      description: article.description,
    }));
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

module.exports = fetchArticles;
