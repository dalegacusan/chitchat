import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from "socket.io-client";
import { Link } from "react-router-dom";

let socket;

export default function Chat({ location }) {

    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
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
        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

        setUsername(username);
        setRoomName(room);

        socket.emit('join', { username, room }, (res) => {

        });

        // Gets called on UnMount
        return () => {
            socket.emit('leave', { username });

            // Turn off a client instance
            socket.off();
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
            <header className="chat-header">
                <h1>
                    <i className="fas fa-smile" />
                    ChatCord
                </h1>
                <Link to={`/`}>
                    <button className="btn" type="submit">Leave Room</button>
                </Link>

            </header>
            <main className="chat-main">
                <div className="chat-sidebar">
                    <h3><i className="fas fa-comments"></i> Room Name:</h3>
                    <h2 id="room-name">JavaScript</h2>
                    <h3><i className="fas fa-users"></i> Users</h3>
                    <ul id="users">
                        <li>Brad</li>
                        <li>John</li>
                        <li>Mary</li>
                        <li>Paul</li>
                        <li>Mike</li>
                    </ul>
                </div>
                <div className="chat-messages">
                    <div className="message">
                        <p className="meta">Brad <span>9:12pm</span></p>
                        <p className="text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                            repudiandae.
						</p>
                    </div>
                    <div className="message">
                        <p className="meta">Mary <span>9:15pm</span></p>
                        <p className="text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                            repudiandae.
						</p>
                    </div>
                </div>
            </main>
            <div className="chat-form-container">
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
                    <button className="btn" onClick={e => sendMessage(e)}><i className="fas fa-paper-plane"></i> Send</button>
                </form>
            </div>
        </div>
    );
}