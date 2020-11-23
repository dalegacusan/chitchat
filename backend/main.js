const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const { messageHandler, roomHandler } = require("./helpers/helpers");

// Routes
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

// "Socket" stores the current connection/socket
io.on('connection', (socket) => {
  socket.on('join', (data, callback) => {
    const { username, room } = data;

    // Returns an Error Object OR a User Object
    const { error, user } = addUser(
      {
        userID: socket.id,
        username,
        room
      }
    );

    const { username: currentUserName, room: currentRoom } = user;

    if (error) return callback(error);

    socket.join(currentRoom);

    // Welcome Message (ONLY to CURRENT SOCKET)
    socket.emit(
      'message',
      messageHandler(
        'admin',
        `Welcome ${currentUserName} to ${currentRoom}.`,
      )
    );

    // Join Message (TO ALL SOCKETS)
    socket.broadcast.to(currentRoom).emit(
      'message',
      messageHandler(
        'admin',
        `${currentUserName} joined the room.`,
      )
    );

    // ==================================================== //
    io.to(currentRoom).emit(
      'roomData',
      roomHandler(
        currentRoom,
        getUsersInRoom(currentRoom)
      )
    );
    // ==================================================== //

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    const { username: currentUsername, room: currentRoom } = user;

    // ==================================================== //
    io.to(currentRoom).emit(
      'message',
      messageHandler(
        currentUsername,
        message,
      )
    );
    // ==================================================== //

    callback();
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    const { username: currentUserName, room: currentRoom } = user;

    if (user) {
      // ==================================================== //
      io.to(currentRoom).emit(
        'message',
        messageHandler(
          'admin',
          `${currentUserName} has left the room.`,
        ),
      )

      io.to(currentRoom).emit(
        'roomData',
        roomHandler(
          currentRoom,
          getUsersInRoom(currentRoom)
        )
      )
      // ==================================================== //
    }
  });

});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server started at Port:`, PORT);
})