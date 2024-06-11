import io from "socket.io-client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import './App.css';
import { useCookies } from "react-cookie";
import "./ChatRoom.css";
//import Chat from "./Chat";
import Chat from "./Chat";

const socket = io.connect("http://localhost:8012"); //connect to server on port

export default function ChatRoom() {
    const [username, setUserName] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const navigate = useNavigate();

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room); //this will be passed to the socket join_room
            setShowChat(true); //set show chat true if
        }
    };

    const logout = () => {
        removeCookie("user");
        navigate("/");
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
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} setShowChat={setShowChat} room={room} />
            )}
        </div>
    );
}

//export default App;
//export default ChatRoom;
