const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');  // Import the 'path' module

const app = express();

// Serve static files from 'public' folder
app.use(express.static('frontend'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve index.html from the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Web scraping route
app.post('/scrape', async (req, res) => {
  const { url, tag } = req.body;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const scrapedData = [];

    $(tag).each((index, element) => {
      scrapedData.push($(element).text());
    });

    res.json({ success: true, data: scrapedData });
  } catch (error) {
    res.json({ success: false, message: 'Error scraping the website. Please try again.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
