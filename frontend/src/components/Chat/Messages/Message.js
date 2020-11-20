import React from "react";

export default function Message(props) {
  const { message, username } = props;
  const { user, text } = message;

  let isSentByCurrentUser = false;

  const trimmedUsername = username.trim().toLowerCase();
  console.log(`${username} === ${trimmedUsername}`);

  // We trimmed our username in the backend
  if (user === trimmedUsername) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        // Display to the RIGHT
        <div className="message backgroundDark">
          <p className="meta userName">{trimmedUsername} <span className="userTime">9:12pm</span></p>
          <p className="text">{text}</p>
        </div>
      )
      : (
        // Display to the LEFT
        <div className="message">
          <p className="meta">{user} <span>9:12pm</span></p>
          <p className="text">{text}</p>
        </div>
      )
  );
}