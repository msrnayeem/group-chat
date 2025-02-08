const express = require('express');
const path = require('path');

const app = express();
const http = require('http');
const expressServer = http.createServer(app);

const { Server } = require('socket.io');
let io = new Server(expressServer);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

expressServer.listen(3000, () => {
    console.log('Server running on port 3000');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat', (data) => {
        socket.broadcast.emit('chat', data);
    });
});
