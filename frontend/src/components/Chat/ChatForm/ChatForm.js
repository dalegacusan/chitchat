import React, { useState } from "react";
import 'emoji-mart/css/emoji-mart.css';

export default function ChatForm(props) {
  const { message, handleInputChange, handleKeyPress, sendMessage, handleToggleEmojis } = props;

  return (
    <div>
      
      <form id="chat-form">
        <div className="input-group mb-3 chatForm">
          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary emojiButton" type="button" onClick={handleToggleEmojis}> <i className="far fa-smile"></i></button>
          </div>
          <div className="custom-file">
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
            <button className="btn chat-btn send-btn" onClick={e => sendMessage(e)}><i className="fas fa-paper-plane"></i> Send</button>
          </div>
        </div>
      </form >
    </div >

  );
}