import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import Loader from "../Loader/Loader";
const axios = require('axios');

export default function Landing() {

    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const USERS = 'https://real-time-chat-react.herokuapp.com/users';

    /*
        Error messages get reset to an empty array,
        once the user gets into a room successfully.
    */
    const handleErrorMessages = (errObj) => {
        setErrorMessages([...errorMessages, errObj]);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "username") {
            setUsername(value);
        } else if (name === "room") {
            setRoomName(value);
        }
    }

    const handleSubmit = (e) => {
        const findUser = users.find(user => {

            const trimmedLowerUsername = username.trim().toLowerCase();
            const trimmedLowerRoomName = roomName.trim().toLowerCase();

            return (user.username === trimmedLowerUsername) && (trimmedLowerRoomName === user.room);
        });

        if (!username || !roomName) {
            e.preventDefault();
            handleErrorMessages(
                {
                    errName: 'incompleteFields',
                    errMessage: 'Please fill in all the fields.'
                }
            );

        } else if (findUser) {
            e.preventDefault();
            handleErrorMessages(
                {
                    errName: 'usernameTaken',
                    errMessage: 'Username is taken in the room.'
                }
            );
        } else {
            return null;
        }
    }

    useEffect(() => {
        axios.get(USERS)
            .then(res => {
                setUsers(res.data);
                setIsLoading(false);
            })
    }, []);

    if (isLoading) {
        return <Loader />
    }

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
                        errorMessages.length !== 0
                            ?
                            <ErrorMessages errorMessages={errorMessages} setErrorMessages={setErrorMessages} />
                            :
                            null
                    }
                    <Link onClick={handleSubmit} to={`/room?username=${username}&room=${roomName}`}>
                        <button type="submit" className="btn">Join Room</button>
                    </Link>
                </form>
            </main>
            <footer className="source-code-footer">
                <p>by <a href="https://github.com/dalegacusan" target="_blank">Dale Gacusan</a></p>
                <i className="fab fa-github"></i>
                Source Code on <a href="https://github.com/dalegacusan/real-time-chat" target="_blank">GitHub</a>
            </footer>
        </div>
    );
}