import React from "react";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Messages(props) {
  const { messages, username } = props;

  return (
    <ScrollToBottom>
      {
        messages.map((message, i) => <Message key={i} message={message} username={username} />)
      }
    </ScrollToBottom>
  );
}