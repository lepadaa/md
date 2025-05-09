const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MODASH_API_BASE = "https://api.modash.io/v1";
const MODASH_API_KEY = process.env.MODASH_API_KEY;

app.post('/search', async (req, res) => {
  const payload = req.body;

  try {
    const response = await axios.post(`${MODASH_API_BASE}/influencers/search`, payload, {
      headers: {
        Authorization: `Bearer ${MODASH_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(error?.response?.status || 500).json({
      error: error?.response?.data || "Unknown server error"
    });
  }
});

app.get('/influencer/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const response = await axios.get(`${MODASH_API_BASE}/influencers/${username}`, {
      headers: {
        Authorization: `Bearer ${MODASH_API_KEY}`
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(error?.response?.status || 500).json({
      error: error?.response?.data || "Unknown server error"
    });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
