import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from "socket.io-client";

import ChatHeader from "./ChatHeader/ChatHeader";
import ChatSidebar from "./ChatSidebar/ChatSidebar";
import Messages from "./Messages/Messages";
import ChatForm from "./ChatForm/ChatForm";

let socket;

export default function Chat({ location }) {

    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [usersInRoom, setUsersInRoom] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:8080';

    const handleInputChange = (e) => {
        const { value } = e.target;
        setMessage(value);
    };

    const handleKeyPress = (e) => {
        const { key } = e;

        if (key === "Enter") {
            sendMessage(e);
        } else {
            return null;
        }
    };

    useEffect(() => {
        // "location" returns a URL
        const { username, room } = queryString.parse(location.search);

        // onRender, make a connection to Backend
        socket = io(ENDPOINT, { transports: ['websocket'], upgrade: false });

        setUsername(username);
        setRoomName(room);

        socket.emit('join', { username, room }, (res) => {
            console.log(res);
        });

        // Gets called on UnMount
        return () => {
            console.log("Closing socket...");
            // Turn off a client instance
            socket.close();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (msg) => setMessages([...messages, msg]));
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return (
        <div className="chat-container">
            <ChatHeader />
            <main className="chat-main">
                <ChatSidebar usersInRoom={usersInRoom} roomName={roomName} />
                <div className="chat-messages">
                    <Messages messages={messages} username={username} />
                </div>
            </main>
            <div className="chat-form-container">
                <ChatForm
                    messages={messages}
                    username={username}
                    handleInputChange={handleInputChange}
                    handleKeyPress={handleKeyPress}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
}