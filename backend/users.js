const users = [];

const addUser = (data) => {
  let { userID, username, room } = data;

  const existingUser = users.find((user) => user.room === room.trim().toLowerCase() && user.username === username.trim().toLowerCase());

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
    const spliced = users.splice(index, 1)[0];

    return spliced;
  }
};

const getUser = (userID) => users.find((user) => user.userID === userID)

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };