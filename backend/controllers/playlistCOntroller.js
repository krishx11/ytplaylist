const youtube = require('../config/youtubeAPI');

exports.searchVideos = async (req, res) => {
  try {
    const { keyword } = req.query;
    const response = await youtube.search.list({
      q: keyword,
      part: 'snippet',
      type: 'video',
      maxResults: 10,
    });
    
    res.json(response.data.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPlaylist = async (req, res) => {
  try {
    const { title, description, videoIds, oauthToken } = req.body;
    
    const response = await youtube.playlists.insert({
      part: 'snippet,status',
      resource: {
        snippet: {
          title: title,
          description: description,
        },
        status: {
          privacyStatus: 'public',
        },
      },
      auth: oauthToken,
    });

    const playlistId = response.data.id;

    for (const videoId of videoIds) {
      await youtube.playlistItems.insert({
        part: 'snippet',
        resource: {
          snippet: {
            playlistId: playlistId,
            resourceId: {
              kind: 'youtube#video',
              videoId: videoId,
            },
          },
        },
        auth: oauthToken,
      });
    }

    res.json({ playlistId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
