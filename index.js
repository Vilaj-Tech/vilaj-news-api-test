require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.NEWS_API_KEY;
console.log("Loaded API Key:", apiKey);

axios.get('https://newsapi.org/v2/everything', {
  params: {
    q: 'Georgia education',
    sortBy: 'publishedAt',
    language: 'en',
    apiKey: apiKey,
  },
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  }
})
.then(response => {
  let articles = response.data.articles;

  if (!articles || articles.length === 0) {
    console.log("No articles found.");
  } else {
    // Remove duplicates by title
    const seenTitles = new Set();
    const uniqueArticles = articles.filter(article => {
      const title = article.title?.trim();
      if (seenTitles.has(title)) return false;
      seenTitles.add(title);
      return true;
    });

    console.log(`\nTop ${Math.min(3, uniqueArticles.length)} Georgia Education Headlines:\n`);
    uniqueArticles.slice(0, 3).forEach((article, index) => {
      console.log(`${index + 1}. ${article.title} (${article.source.name})`);
      console.log(`   ${article.url}\n`);
    });
  }
})