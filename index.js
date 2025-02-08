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
    console.log('A user connected');

    socket.on('joinRoom', ({roomId, username}) => {
        if (!rooms[roomId]) {
            rooms[roomId] = {
                userCount: 0,
                timer: null
            };
        }

        socket.join(roomId);
        rooms[roomId].userCount++;

        // Notify all users in the room about the new user joining
        io.in(roomId).emit('userJoined', {
            message: `${username} has joined the room.`,
            userCount: rooms[roomId].userCount
        });

        console.log(`${username} joined room: ${roomId}`);

        if (rooms[roomId] && rooms[roomId].timer) {
            clearTimeout(rooms[roomId].timer);
        }
    });

    socket.on('cancelRoom', ({roomId, username}) => {
        if (rooms[roomId]) {
            io.in(roomId).emit('roomCanceled', 'The room has been canceled by the creator. Redirecting to the homepage...');
            console.log(`Room ${roomId} is canceled by the creator.`);
            delete rooms[roomId];
        }
    });

    socket.on('chat', (data) => {
        socket.to(data.roomId).emit('chat', data);
    });

    socket.on('disconnecting', () => {
        socket.rooms.forEach((roomId) => {
            if (roomId !== socket.id) {
                rooms[roomId].userCount--;

                // Emit the updated user count and notify other users of the disconnection
                io.in(roomId).emit('userLeft', {
                    userCount: rooms[roomId].userCount,
                    message: `${socket.id} has left the room`
                });

                if (rooms[roomId].userCount <= 0) {
                    rooms[roomId].timer = setTimeout(() => {
                        delete rooms[roomId];
                        console.log(`Room ${roomId} removed due to inactivity`);
                    }, 5 * 60 * 1000); // 5 minutes
                }
            }
        });
    });



    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
