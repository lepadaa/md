const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const MODASH_API_KEY = process.env.MODASH_API_KEY;
const BASE_URL = 'https://api.modash.io/v1';

app.post('/search', async (req, res) => {
  try {
    const { platform, filters } = req.body;

    if (!platform || !filters) {
      return res.status(400).json({ error: 'Missing platform or filters.' });
    }

    const endpoint = `${BASE_URL}/${platform}/search`;

    // 🔍 LOG TO VERIFY PAYLOAD
    console.log('🔍 Final Modash POST payload:', JSON.stringify(filters, null, 2));

    const response = await axios.post(endpoint, { ...filters }, {
      headers: {
        Authorization: `Bearer ${MODASH_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error('🔥 Modash API error:', err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/lookup', async (req, res) => {
  try {
    const { platform, username } = req.query;

    if (!platform || !username) {
      return res.status(400).json({ error: 'Missing platform or username' });
    }

    const endpoint = `${BASE_URL}/${platform}/profile?username=${encodeURIComponent(username)}`;

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${MODASH_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error('🔥 Modash lookup error:', err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});


app.listen(3000, () => {
  console.log('✅ Modash Proxy running on http://localhost:3000');
});
