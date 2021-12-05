const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('gameHangmanP1', (data) => {
    io.emit('gameHangmanp1', data);
  });

  socket.on('gameHangmanP2', (data) => {
    io.emit('gameHangmanP2', data);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
