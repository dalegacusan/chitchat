import React from "react";
import { Link } from "react-router-dom";

export default function ChatHeader() {
  return (
    <header className="chat-header">
      <h1>
        <i className="fas fa-smile" />
                    ChatCord
                </h1>
      <Link to={`/`}>
        <button className="btn" type="submit">Leave Room</button>
      </Link>

    </header>
  );
}