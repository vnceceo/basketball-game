const express = require('express'); const http = require('http'); const socketIo = require('socket.io'); const app = express(); const server = http.createServer(app); const io = socketIo(server); app.use(express.static('public')); let players = {}; io.on('connection', (socket) => { console.log('A player connected: ' + socket.id); players[socket.id] = { x: 100, y: 500 }; socket.on('move', (data) => { players[socket.id].x = data.x; players[socket.id].y = data.y; io.emit('opponentMove', { x: data.x, y: data.y }); }); socket.on('ball', (data) => { io.emit('ballUpdate', data); }); socket.on('disconnect', () => { console.log('A player disconnected: ' + socket.id); delete players[socket.id]; }); }); server.listen(3000, () => { console.log('Server is running on http://localhost:3000'); });