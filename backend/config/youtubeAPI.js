const { google } = require('googleapis');

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.AIzaSyAiTTnKfjcdsEa4yURgOu09amFIbwb58mA,
});

module.exports = youtube;
