io.on('connection', (socket) => {
    socket.on('start-game', () => {
        io.emit('game-started');
    });

    socket.on('score-update', (score) => {
        io.emit('score-update', score);
    });

    socket.on('end-game', () => {
        io.emit('game-ended');
    });
});
