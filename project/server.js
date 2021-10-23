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
app.use(express.urlencoded({ extended: true }));

const rooms = new Map();

app.get('/rooms/:id', (req, res) => {
  const {id: roomName} = req.params;
  const obj = rooms.has(roomName) ? {
    users: [...rooms.get(roomName).get('users').values()],
    messages: [...rooms.get(roomName).get('messages').values()],
  } : {
    users: [],
    messages: [],
  }
    res.json(obj);
});

app.post('/rooms', (req, res) => {
  const data = req.body;
  if (!rooms.has(data.roomName)) {
    rooms.set(data.roomName, new Map([
      ['users', new Map()],
      ['messages', []],
    ]));
  }
  res.send();
});

io.on('connection', (socket) => {

  socket.on('ROOM:JOIN', ({roomName, userName}) => {
    socket.join(roomName);
    rooms.get(roomName).get('users').set(socket.id, userName);
    const users = [...rooms.get(roomName).get('users').values()];
    socket.broadcast.to(roomName).emit('ROOM:SET_USERS', users);
    console.log(roomName, userName)
  });

  socket.on('ROOM:NEW_MESSAGE', ({roomName, userName, text}) => {
    const obj = { userName, text };
    rooms.get(roomName).get('messages').push(obj);
    socket.broadcast.to(roomName).emit('ROOM:NEW_MESSAGE', obj);
  });

  socket.on('disconnect', () => {
    rooms.forEach((value, roomName) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...rooms.get(roomName).get('users').values()];
        socket.broadcast.to(roomName).emit('ROOM:SET_USERS', users);
      }
    })
  })

  console.log('user connected', socket.id);
});

server.listen(3008, () => {
  console.log(`Сервер запущен на порту 3008`)
});