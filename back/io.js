const express = require('express');
const http = require('http');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log(`Connected user: ${socket}`);
  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});

module.exports = { server, io, app };
