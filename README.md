# Group Chat with Socket.io, Express, and Node.js

This is a real-time **group chat application** built with **Socket.io**, **Express**, and **Node.js**. The app allows users to create or join rooms for private group chats. It uses **HTML**, **CSS**, **jQuery**, and **JavaScript** for the frontend, and **Node.js** with **Socket.io** for real-time communication.

## Features

- **Room System:** Users can create a room with a unique link and share it with others.
- **Real-time Messaging:** Messages are instantly sent and received using Socket.io.
- **File Sharing (Without Storage):** Users can send files along with messages, but files are not stored on the server.
- **Copy Room Link:** Users can copy and share the unique room link easily.
- **Auto Room Cleanup:** If no users are in a room for **5 minutes**, the room is automatically removed.
- **Responsive UI:** Works well on both desktop and mobile devices.
- **Broadcasting Messages:** Messages are sent to all connected users in the same room (except the sender).

## Prerequisites

To run this project locally, you need **Node.js** installed. You can download and install it from the official site:

- [Node.js Download](https://nodejs.org/)

You will also need **npm** (Node Package Manager) to manage dependencies.

## Project Structure

```
/group-chat-socket
│   README.md
│   package.json
│   .gitignore
│
├───public
│       index.html
│       room.html
│
└───server
        index.js
```

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/msrnayeem/group-chat
cd group-chat
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Server

```bash
npm start
```

The server will start on `http://localhost:3000/`.

## Usage

### Creating a Room
- Open `http://localhost:3000/`.
- Click **"Create Room"**, which will generate a unique link.
- Share this link with others to join the room.

### Joining a Room
- Open the unique room link shared by another user.
- Start chatting in the private room.

### Sending Messages & Files
- Type a message and click **Send** to send a chat message.
- Attach a file and click **Send** to send a message with a file (file will not be stored on the server).

### Copying the Room Link
- Click **"Copy Room Link"** to copy the link and share it with others.

## License

This project is open-source and available under the **MIT License**.

---

🚀 **Enjoy real-time chatting with rooms!**

