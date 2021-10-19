const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  },
});

const rooms = new Map();

app.use(cors());

app.get('/rooms', (req, res) => {
    res.json(rooms);
});

app.post('/rooms', (req, res) => {
  console.log('Woo-hoo');
});

io.on('connection', (socket) => {
    console.log('user connected', socket.id)
})

server.listen(3008);