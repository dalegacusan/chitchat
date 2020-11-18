const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

// Get all Routes
const router = require('./router');
const { callbackify } = require('util');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// All code will be inside this connection,
// because "socket" will store the current connection/socket
io.on('connection', (socket) => {
  socket.on('join', ({ username, room }, callback) => {
    // Returns an Error Object OR a User Object
    const { error, user } = addUser({ userID: socket.id, username, room });
    console.log(`${username} joined the room.`);

    if (error) return callback(error);

    // Welcomes a user to the chat
    socket.emit('message', { user: 'admin', text: `Welcome ${username} to ${room}.` });
    // "broadcast" sends a message to everyone besides a specific user/room
    // Let everybody in the room know that a user has joined the room.
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${username} joined the room.` });

    // Joins a user in a room
    socket.join(user.room);

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.username, text: message });

    callback();
  })

  socket.on('leave', ({ username }) => {
    console.log(`${username} left the room.`);
  });

});

app.use(router);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server started at Port:`, PORT);
})