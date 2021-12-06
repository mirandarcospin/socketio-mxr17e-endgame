const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('forCorrectParentNode', (data) => {
    io.emit('forCorrectParentNode', data);
  });

  socket.on('forLettersParentNode', (data) => {
    io.emit('forLettersParentNode', data);
  });

  socket.on('forContext', (d1,d2,d3,d4) => {
    io.emit('forContext', d1,d2,d3,d4);
  });

  socket.on('forLettersParentNode', (data) => {
    io.emit('forLettersParentNode', data);
  });

  socket.on('gameHangmanP1', (data) => {
    io.emit('gameHangmanP1', data);
  });

  socket.on('gameHangmanP2', (data) => {
    io.emit('gameHangmanP2', data);
  });

  socket.on('forGamePoints', (data) => {
    io.emit('forGamePoints', data);
  });

  socket.on('gamePlay', () => {
    io.emit('gamePlay');
  });  
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
