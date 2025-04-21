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
    const { platform, ...payload } = req.body;

    if (!platform || !payload.filters) {
      return res.status(400).json({ error: 'Missing platform or filters.' });
    }

    const endpoint = `${BASE_URL}/${platform}/search`;

    const response = await axios.post(endpoint, payload, {
      headers: {
        Authorization: `Bearer ${MODASH_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error('🔥 Error from Modash:', err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('✅ Modash Proxy is live at http://localhost:3000');
});
