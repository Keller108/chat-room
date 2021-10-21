const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use(express.json());

const rooms = new Map();

app.get('/rooms', (req, res) => {
    res.json(rooms);
});

app.post('/rooms', (req, res) => {
  const { roomName, userName } = req.body;
  if (!rooms.has(roomName)) {
    rooms.set(roomName, new Map([
      ['users', new Map()],
      ['messages', []],
    ]))
  }
});

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', (data) => {
    console.log(data)
  });

  console.log('user connected', socket.id)
});

server.listen(3008, () => {
  console.log(`Сервер запущен на порту 3008`)
});