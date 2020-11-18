const users = [];

const addUser = (data) => {
  const { userID, username, room } = data;

  username.trim().toLowerCase();
  room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.username === username);

  if (existingUser) {
    return { error: "Username is taken." };
  }

  const user = { userID, username, room };
  users.push(user);

  return { user };
};

const removeUser = (userID) => {
  const index = users.findIndex((user) => user.userID === userID);

  if (index) {
    return users.splice(index, 1);
  }
};

const getUser = (userID) => users.find((user) => user.userID === userID)

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };