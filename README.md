# Group Chat with Socket.io, Express, and Node.js

This is a basic real-time **group chat application** built with **Socket.io**, **Express**, and **Node.js**. The app allows multiple users to communicate in real-time using a chat interface. It uses **HTML**, **CSS**, **jQuery**, and **JavaScript** for the frontend, and **Node.js** with **Socket.io** for handling real-time communication.

## Features

- **Real-time Messaging:** Chat messages are instantly sent and received by all connected users using Socket.io.
- **File Sharing (Without Storage):** Users can send files along with messages, but files are not stored on the server.
- **Simple UI:** A clean, simple chat interface built with basic HTML and CSS.
- **Responsive:** The app is responsive and should work well on mobile devices.
- **Broadcasting Messages:** Messages are broadcasted to all connected users except the sender.

## Prerequisites

To run this project locally, you need to have **Node.js** installed. You can download and install Node.js from the official site:

- [Node.js Download](https://nodejs.org/)

You will also need **npm** (Node Package Manager), which comes with Node.js, to manage dependencies.

## Project Structure

```
/group-chat-socket
│   README.md
│   package.json
│   .gitignore
│
├───public
│       index.html
│
└───server
        index.js
```

## Getting Started

Follow these steps to run the project on your local machine:

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

- Open `http://localhost:3000/` in multiple browser tabs to simulate multiple users.
- Type a message and click **Send** to send a chat message.
- Attach a file and click **Send** to send a message with a file (file will not be stored on the server).

## License

This project is open-source and available under the **MIT License**.

---

🚀 **Enjoy real-time chatting!**