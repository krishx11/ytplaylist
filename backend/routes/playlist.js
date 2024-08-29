const express = require('express');
const { createPlaylist, searchVideos } = require('../controllers/playlistController');
const router = express.Router();

router.post('/create', createPlaylist);
router.get('/search', searchVideos);

module.exports = router;
