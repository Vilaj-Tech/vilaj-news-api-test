require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

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
    fs.writeFileSync('public/news.json', '[]', 'utf8'); // Ensure file is cleared
  } else {
    // Remove duplicates by title
    const seenTitles = new Set();
    const uniqueArticles = articles.filter(article => {
      const title = article.title?.trim();
      if (seenTitles.has(title)) return false;
      seenTitles.add(title);
      return true;
    });

    // Limit to top 10 articles
    const topArticles = uniqueArticles.slice(0, 10);

    // Write to file
    fs.writeFileSync('public/news.json', JSON.stringify(topArticles, null, 2), 'utf8');
    console.log("✅ news.json file updated with latest articles.");
  }
})
.catch(error => {
  console.error("Error fetching news:", error);
});
