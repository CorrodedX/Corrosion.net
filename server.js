const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Temporary storage (replace with database)
const users = {};
const onlineUsers = new Set();

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    if (users[username]) {
        return res.status(400).json({ error: 'Username taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = { password: hashedPassword };
    res.status(201).json({ message: 'Registration successful' });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users[username];

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
});

// Socket.io connection
io.on('connection', (socket) => {
    socket.on('join', (username) => {
        if (onlineUsers.has(username)) {
            socket.emit('username-taken');
            return;
        }

        onlineUsers.add(username);
        socket.username = username;
        
        socket.emit('welcome', Array.from(onlineUsers));
        socket.broadcast.emit('user-joined', username);
        
        socket.on('chat-message', (msg) => {
            io.emit('chat-message', { username, message: msg });
        });

        socket.on('position-update', (pos) => {
            socket.broadcast.emit('player-moved', { username, ...pos });
        });

        socket.on('disconnect', () => {
            onlineUsers.delete(username);
            io.emit('user-left', username);
        });
    });
});

http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
