import React from "react";

export default function ChatForm(props) {
  const { message, handleInputChange, handleKeyPress, sendMessage } = props;

  return (
    <form id="chat-form">
      <input
        id="msg"
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter Message"
        required
        autoComplete="off"
      />
      <button className="btn chat-btn" onClick={e => sendMessage(e)}><i className="fas fa-paper-plane"></i> Send</button>
    </form>
  );
}