# Overview:
This program lets users send messages back and forth under a username of their choice. Each message has the username and timestamp displayed underneath the message, 
and each message is limited to 128 characters.

# Explanation of the components and their interactions:
* This message board uses React (JavaScript), Node (JavaScript), HTML, and CSS.
* The CSS components and HTML components work together to create the display and interactions for the message board.
* The Node component uses socket.io to communicate with the React features. socket.io lets the React components know whenever a message has been sent, whenever a user joins the chat room, and whenever a user leaves the chat room.
* The React component receives messages from the Node component and displays messages and the corresponding information. 


# Features:
* Users can type a message and post it to the message board
* Each message is non-empty and is at most 128 characters long
* Users can see messages on the message board from most to least recent
* Users on different computers can post to the same board and view each other's messages
* Users can choose a username, and that username is displayed underneath all messages that they send

# How to start the application:
* Download the file from GitHub and unzip the folder
* Drag the folder into VSCode or a different code editor of your choice
* In the terminal, go to the folder that holds the file and type "pip3 install flask" if not already installed
* Go to https://nodejs.org/en/download and install node
* In the file itself, type "cd server" to get to the server folder
* Once in the server folder, type "npm start" and you should see "SERVER RUNNING"
* Next, open a new terminal and type "cd client" to get to the client folder
* Once in the client folder, type "npm start", and this should open http://localhost:3000
* Follow the instructions in the chatroom and enjoy!

