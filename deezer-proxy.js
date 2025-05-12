import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 5050;

app.use(cors());

app.get('/api/*', async (req, res) => {
  const deezerUrl = `https://api.deezer.com${req.originalUrl.replace(/^\/api/, '')}`;
  try {
    const response = await axios.get(deezerUrl, { responseType: 'json' });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Deezer proxy server running at http://localhost:${PORT}/api`);
}); 