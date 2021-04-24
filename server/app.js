const http = require('http');
const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const config = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const tweetsConfig = require('./stream-tweets.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.send(`Server started on port ${PORT}`);
});

// This runs when client is connected
io.on('connection', async () => {
  console.log('Client connected... ');
  let currentRules;

  try {
    // Get all stream rules
    currentRules = await tweetsConfig.getRules();
    // Delete all stream rules
    await tweetsConfig.deleteRules(currentRules);
    // Set rules based array above
    await tweetsConfig.setRules();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  tweetsConfig.streamTweets(io);
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
