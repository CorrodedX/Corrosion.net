socket.on('position-update', (pos) => {
    if (typeof pos.x !== 'number' || typeof pos.y !== 'number') {
        return socket.emit('error', 'Invalid position');
    }
    socket.broadcast.emit('player-moved', { username: socket.username, ...pos });
});
