# 📰 Vilaj News Automation

This repo powers the **automated daily news system** for Vilaj — helping bring timely, relevant education news to our platform visitors.

## 🔁 What It Does

- Fetches the **top 15 Georgia-related education news articles** daily
- Uses the [NewsAPI.org](https://newsapi.org/) for sourcing headlines
- Saves the articles in a local file: `/public/news.json`
- Automatically runs every morning at **8 AM ET** via GitHub Actions

## 🛠 Technologies Used

- Node.js
- Axios
- Dotenv (for local API keys)
- GitHub Actions (for daily automation)
- NewsAPI

## 🛡️ Security

- API keys are stored securely via GitHub **Secrets**
- `.env` is excluded via `.gitignore`
- No secrets are hardcoded or pushed publicly

## 🖥️ For Developers

**To run locally:**

1. Create a `.env` file with:
