import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from "socket.io-client";
import { Picker } from 'emoji-mart';

// Components
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
    const [toggleEmojis, setToggleEmojis] = useState(false);
    const ENDPOINT = 'https://real-time-chat-react.herokuapp.com/';
    // const ENDPOINT = 'localhost:8080';

    const handleInputChange = (e, emoji) => {


        if (e === null && emoji) {
            setMessage((curr) => curr + emoji);
        } else {
            const { value } = e.target;
            setMessage(value);
        }

    };

    const handleKeyPress = (e) => {
        const { key } = e;

        if (key === "Enter") {
            sendMessage(e);
        } else {
            return null;
        }
    };


    const handleEmojiSelect = (emoji) => {
        handleInputChange(null, emoji.native)
    };

    const handleToggleEmojis = () => {
        setToggleEmojis(!toggleEmojis)
    }

    useEffect(() => {
        /* 
            queryString.parse(location.search) RETURNS:
            {
                room: "xxx",
                username: "yyy"
            }
        */
        const { username, room } = queryString.parse(location.search);

        // Create a connection to Backend
        socket = io(ENDPOINT, { transports: ['websocket'], upgrade: false });

        setUsername(username);
        setRoomName(room);

        socket.emit('join', { username, room }, (err) => {

        });

        // Gets called on unMount
        return () => {
            // Turn off a client instance
            socket.close();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (msg) => setMessages([...messages, msg]));
    }, [messages]);

    useEffect(() => {
        socket.on('roomData', (data) => {
            const { users } = data;
            setUsersInRoom(users);
        });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    const exclude = ["flags", "custom", "search"]

    return (
        <div className="chat-container">
            <ChatHeader />
            <main className="chat-main">
                <ChatSidebar usersInRoom={usersInRoom} roomName={roomName} />
                <div className="chat-messages">
                    <Messages messages={messages} username={username} />
                </div>
            </main>
            <div className="chat-form-container" style={{ position: "relative" }}>
                {
                    toggleEmojis
                        ?
                        <Picker
                            perLine={8}
                            title={"Pick Emoji"}
                            exclude={exclude}
                            style={{ position: "absolute", bottom: "0", marginBottom: "55px" }}
                            onSelect={handleEmojiSelect}
                        />
                        : null
                }
                <ChatForm
                    message={message}
                    username={username}
                    handleInputChange={handleInputChange}
                    handleKeyPress={handleKeyPress}
                    sendMessage={sendMessage}
                    handleToggleEmojis={handleToggleEmojis}
                />
            </div>
        </div>
    );
}