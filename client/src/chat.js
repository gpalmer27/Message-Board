import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

//adds a zero in front of the minutes if the minutes are less than 10
//converts the hours from military time to standard time
function getTime() {
    var time = new Date();
    const hours = (time.getHours() > 12 ? time.getHours() - 12 : time.getHours());
    const mins = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
    const morningVsAfternoon = (time.getHours() < 12 ? 'AM': 'PM');
    return hours + ":" + mins + morningVsAfternoon;
}
function Chat({ socket, username, room}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  //sends the message as long as the message box isn't empty
  //adds the date with the message in the form hour: minute
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time : getTime(),
      };

      //adds the current message to the list of messsages
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      
    }
  };

//adds the new message to the message list
  useEffect(() => {
    const receiveMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };
  
    socket.on("receive_message", receiveMessage);
  
    return () => {
      socket.off("receive_message", receiveMessage);
    };
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Message Board</p>
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type message here"
          maxlength="128" 
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="chat-messages">
        <ScrollToBottom className="message-holder">
          {messageList.toReversed().map((messageContent) => {
            return (
              <div className="message">
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-info">
                    <p id="author">{messageContent.author} </p>
                    <p> &nbsp;</p>
                    <p id="time">{messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
    </div>
  );
}

export default Chat;