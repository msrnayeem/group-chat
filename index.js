const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/room/:roomId', (req, res) => {
    res.sendFile(path.join(__dirname, 'room.html'));
});

const rooms = {}; // Track active rooms and their timers

io.on('connection', (socket) => {

    socket.on('joinRoom', ({ roomId, username }) => {
        if (!rooms[roomId]) {
            rooms[roomId] = { userCount: 0, timer: null, users: [], creator: username };
        }



        rooms[roomId].users.push(username);
        socket.username = username;
        socket.roomId = roomId;
        socket.join(roomId);
        rooms[roomId].userCount++;

        if (rooms[roomId].creator === username) {
            socket.emit('roomCreator'); // ✅ Only the creator gets this event
        }

        io.in(roomId).emit('userJoined', {
            message: `${username} has joined the room.`,
            userCount: rooms[roomId].userCount
        });

        console.log(`${username} joined room: ${roomId}`);
    });

    socket.on('checkUsername', ({ roomId, username }) => {
        if (!rooms[roomId]) {
            rooms[roomId] = { userCount: 0, timer: null, users: [] };
        }

        if (rooms[roomId].users.includes(username)) {
            socket.emit('usernameTaken');
        } else {
            socket.emit('usernameAvailable');
        }
    });


    socket.on('cancelRoom', (roomId) => {
        if (rooms[roomId] && rooms[roomId].creator === socket.username) {
            io.in(roomId).emit('roomCanceled');
            io.in(roomId).socketsLeave(roomId);
            delete rooms[roomId];
        }
    });



    socket.on('chat', (data) => {
        socket.to(data.roomId).emit('chat', data);
    });

    socket.on('disconnecting', () => {
        if (socket.roomId && rooms[socket.roomId]) {
            rooms[socket.roomId].users = rooms[socket.roomId].users.filter(user => user !== socket.username);
            rooms[socket.roomId].userCount--;

            io.in(socket.roomId).emit('userLeft', {
                userCount: rooms[socket.roomId]?.userCount || 0,
                message: `${socket.username} has left the room.`
            });

            if (rooms[socket.roomId].userCount <= 0) {
                rooms[socket.roomId].timer = setTimeout(() => {
                    if (rooms[socket.roomId]) {
                        delete rooms[socket.roomId];
                        console.log(`Room ${socket.roomId} removed due to inactivity`);
                    }
                }, 5 * 60 * 1000);
            }
        }
    });


    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
