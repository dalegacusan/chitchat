import React from "react";
import { Link } from "react-router-dom";

export default function ChatHeader() {
  return (
    <header className="chat-header join-header">
      <div>
        <i className="fas fa-comment-dots" />
        <p>Chitchat</p>
      </div>

      <Link to={`/`}>
        <button className="btn chat-btn" type="submit">Leave Room</button>
      </Link>

    </header>
  );
}