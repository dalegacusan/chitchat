const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

// Get all Routes
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// All code will be inside this connection,
// because "socket" will store the current connection/socket
io.on('connection', (socket) => {
  console.log("User Connected");

  socket.on('disconnect', () => {
    console.log("User Disconnected");
  })

});

app.use(router);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server started at Port:`, PORT);
})