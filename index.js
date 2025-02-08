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

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);

        // Clear room removal timer if users rejoin
        if (rooms[roomId] && rooms[roomId].timer) {
            clearTimeout(rooms[roomId].timer);
        }

        // Track user count in room
        rooms[roomId] = {
            userCount: (rooms[roomId]?.userCount || 0) + 1,
            timer: null
        };
    });

    socket.on('chat', (data) => {
        socket.to(data.roomId).emit('chat', data);
    });

    socket.on('disconnecting', () => {
        // Remove user from all joined rooms
        socket.rooms.forEach((roomId) => {
            if (roomId !== socket.id) { // Exclude the user's own room ID
                rooms[roomId].userCount--;

                // If room is empty, set a timer to remove it
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
