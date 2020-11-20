import React from "react";

export default function ChatSidebar(props) {
  const { usersInRoom, roomName } = props;

  return (
    <div className="chat-sidebar">
      <h3><i className="fas fa-comments"></i> Room Name:</h3>
      <h2 id="room-name">{roomName}</h2>
      <h3><i className="fas fa-users"></i> Users</h3>
      <ul id="users">
        {
          usersInRoom.map(user => {
            return (<li key={user.userID}>{user.username}</li>);
          })
        }
      </ul>
    </div>
  );
}