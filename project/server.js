const express = require('express');

const { PORT = 3008 } = process.env;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  },
});

const rooms = new Map();

app.get('/rooms', (req, res) => {
    res.json(rooms);
});

app.post('/rooms', (req, res) => {
  console.log('Hello world');
});

io.on('connection', socket => {
    console.log('user connected', socket.id)
})

server.listen(PORT, (err) => {
    if (err) {
        throw Error(err)
    }
    console.log(`Сервер запущен на порту ${PORT}`)
});