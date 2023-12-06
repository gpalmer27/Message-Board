import './App.css';
import io from 'socket.io-client';
import {useState} from "react";
import Chat from './chat';


const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  //joins the room if the username has at least one character
  const joinRoom = () => {
    if (username !== "")
    {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        //prompts user to enter a username before joining 
        //the chat room
      <div className="joinMessageBoard">
        <h3>Enter Your Username</h3>
        <input type="text" placeholder="Name" 
        //the room is always set to the same number so that all users
        //can see the messages sent
        onChange={(event) => {setUsername(event.target.value); setRoom("10")}}/>
        <button onClick={joinRoom}>Join Message Board</button>
      </div>
      ) : (
        //once the username is entered, the user joins the room
        <Chat socket={socket} username={username} room={room} />
    )}
    </div>
  );
}

export default App;
