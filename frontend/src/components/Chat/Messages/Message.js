import React from "react";

export default function Message(props) {
  const { message, username } = props;
  const { user, text, time } = message;

  let isSentByCurrentUser = false;

  const trimmedUsername = username.trim().toLowerCase();

  // We trimmed our username in the backend
  if (user === trimmedUsername) {
    isSentByCurrentUser = true;
  }

  return (
    user === 'admin' ?
      <p className="meta userName welcomeText"><span className="text">{text}</span></p>
      :
      isSentByCurrentUser
        ? (
          <div className="message backgroundDark userMessage">
            <p className="meta userName">{trimmedUsername} <span className="userTime">{time}</span></p>
            <p className="text">{text}</p>
          </div>
        )
        : (
          <div className="message userMessage">
            <p className="meta">{user} <span>{time}</span></p>
            <p className="text">{text}</p>
          </div>
        )
  );
}