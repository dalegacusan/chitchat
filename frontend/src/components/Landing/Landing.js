import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
const axios = require('axios');

export default function Landing() {

    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [users, setUsers] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "username") {
            setUsername(value);
        } else if (name === "room") {
            setRoomName(value);
        }
    }

    const handleSubmit = (e) => {
        const findUser = users.find(user => user.username === username.trim().toLowerCase());

        if (!username || !roomName) {
            e.preventDefault();
            setErrorMessage('Please fill in all the fields.');
            setTimeout(() => setErrorMessage(''), 5000);
        } else if (findUser) {
            e.preventDefault();
            setErrorMessage('Username is taken.');
            setTimeout(() => setErrorMessage(''), 5000);
        } else {
            return null;
        }
    }

    useEffect(() => {
        axios.get('/users')
            .then(res => {
                setUsers(res.data);
            })
    }, []);

    return (
        <div className="join-container">
            <header className="join-header">
                <i className="fas fa-comment-dots" />
                <p>Chitchat</p>
            </header>
            <main className="join-main">
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            value={username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="room">Room</label>
                        <input
                            type="text"
                            className="form-control"
                            name="room"
                            id="room"
                            value={roomName}
                            onChange={handleInputChange}
                            placeholder="Enter Room ID"
                        />
                    </div>
                    {
                        errorMessage
                            ?
                            <div className="alert alert-danger" role="alert">
                                <span><strong>Uh oh!</strong> {errorMessage}</span>
                            </div>
                            :
                            null
                    }

                    <Link onClick={handleSubmit} to={`/room?username=${username}&room=${roomName}`}>
                        <button type="submit" className="btn">Join Room</button>
                    </Link>
                </form>
            </main>
            <footer className="source-code-footer">
                <a href="https://github.com/dalegacusan" target="_blank">
                    <i className="fab fa-github"></i>
                </a>
                Source Code on <a href="https://github.com/dalegacusan/real-time-chat" target="_blank">GitHub</a>
            </footer>
        </div>
    );
}