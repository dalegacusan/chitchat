import React from "react";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Messages(props) {
  const { messages, username } = props;



  return (
    <ScrollToBottom>
      {
        messages.map((message, i) => {
          const { user } = message;
          const trimmedUsername = username.trim().toLowerCase();

          if (user === trimmedUsername) {
            return (
              <div key={i} className="d-flex justify-content-end">
                <Message message={message} username={username} />
              </div>
            );
          } else if (user === "admin") {
            return (
              <Message key={i} message={message} username={username} />
            );
          } else {
            return (
              <div key={i} className="d-flex justify-content-start">
                <Message message={message} username={username} />
              </div>
            );
          }
        })
      }
    </ScrollToBottom>
  );
}