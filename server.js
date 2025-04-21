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

    // Build the endpoint
    const endpoint = `${BASE_URL}/${platform}/search`;

    // POST request to Modash with correct structure
    const response = await axios.post(
      endpoint,
      { filters }, // <-- Important: filters must be inside an object
      {
        headers: {
          Authorization: `Bearer ${MODASH_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error('Error from Modash:', err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('✅ Modash Proxy running on http://localhost:3000');
});
