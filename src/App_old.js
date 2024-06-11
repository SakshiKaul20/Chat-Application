import io from "socket.io-client";
import { useState } from "react";
import "./App.css";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001"); //connect to server on port

function App() {
    const [username, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room); //this will be passed to the socket join_room
            setShowChat(true); //set show chat true if
        }
    };

    return (
        <div className="App">
            {!showChat ? (
                <div className="joinChatContainer">
                    <h3>Join A Chat</h3>
                    <input
                        type="text"
                        placeholder="Sakshi..."
                        onChange={(event) => {
                            setUserName(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Room ID..."
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    />
                    <button onClick={joinRoom}>Join a Room</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    );
}

export default App;
