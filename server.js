const express = require('express');
const axios = require('axios');

const app = express();

app.get('/api/latest-news', async (req, res) => {
  const { limit } = req.query;
  const apiKey = process.env.VITE_CURRENTS_API_TOKEN;

  try {
    const response = await axios.get(`https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}&limit=${limit}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching latest news:', error);
    res.status(500).json({ error: 'Failed to fetch latest news' });
  }
});

app.get('/api/search', async (req, res) => {
  const { keywords, limit } = req.query;
  const apiKey = process.env.VITE_CURRENTS_API_TOKEN;

  try {
    const response = await axios.get(`https://api.currentsapi.services/v1/search?apiKey=${apiKey}&keywords=${keywords}&limit=${limit}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error searching news:', error);
    res.status(500).json({ error: 'Failed to search news' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});