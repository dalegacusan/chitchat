const messageHandler = (user, text) => {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return { user, text, time };
}

const roomHandler = (room, users) => {
  return { room, users }
}

module.exports = { messageHandler, roomHandler };