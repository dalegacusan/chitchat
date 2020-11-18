import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Landing() {

    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "username") {
            setUsername(value);
        } else if (name === "room") {
            setRoomName(value);
        }
    }

    return (
        <div className="join-container">
            <header className="join-header">
                <h1>
                    <i className="fas fa-smile" />
                ChatCord
                </h1>
            </header>
            <main className="join-main">
                <form>
                    <div className="form-control">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="room">Room</label>
                        <input
                            type="text"
                            name="room"
                            id="room"
                            value={roomName}
                            onChange={handleInputChange}
                            placeholder="Enter Room ID"
                        />
                    </div>
                    <Link onClick={e => (!username || !roomName) ? e.preventDefault() : null} to={`/room?username=${username}&room=${roomName}`}>
                        <button className="btn" type="submit">Join Room</button>
                    </Link>
                </form>
            </main>
        </div>
    );
}
