const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

// Get all Routes
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

// All code will be inside this connection,
// because "socket" will store the current connection/socket
io.on('connection', (socket) => {
  socket.on('join', ({ username, room }, callback) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Returns an Error Object OR a User Object
    const { error, user } = addUser({ userID: socket.id, username, room });
    console.log(`${username} joined the room.`);

    if (error) return callback(error);

    // Joins a user in a room
    socket.join(user.room);

    // Welcomes a user to the chat
    socket.emit('message', { user: 'admin', text: `Welcome ${username} to ${room}.`, time });
    // "broadcast" sends a message to everyone besides a specific user/room
    // Let everybody in the room know that a user has joined the room.
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${username} joined the room.`, time });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    io.to(user.room).emit('message', { user: user.username, text: message, time });

    callback();
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.username} has left the room.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });

});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server started at Port:`, PORT);
})