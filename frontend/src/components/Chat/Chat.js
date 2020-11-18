import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from "socket.io-client";

let socket;

export default function Chat({ location }) {

    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const ENDPOINT = 'localhost:8080';

    useEffect(() => {
        // "location" returns a URL
        const { username, room } = queryString.parse(location.search);

        socket = io(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});

        setUsername(username);
        setRoomName(room);

        console.log(socket);

    }, [ENDPOINT, location.search]);

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h1>
                    <i className="fas fa-smile" />
                    ChatCord
                </h1>
                <a href="index.html" className="btn">Leave Room</a>
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
                        placeholder="Enter Message"
                        required
                        autoComplete="off"
                    />
                    <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
                </form>
            </div>
        </div>
    );
}