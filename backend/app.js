const express = require('express');
const cors = require('cors');
require('dotenv').config();

const playlistRoutes = require('./routes/playlistRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/playlist', require('./routes/playlistRoutes'));

const PORT = process.env.PORT || 5001;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`YouTube API Key: ${YOUTUBE_API_KEY}`);
});
