const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var playerID = 0;
io.on('connection', function(socket){
  playerID += 1;
  console.log('connection ' + socket.id + ' playerId ' + playerID);
  socket.emit('yourid', playerID);
  
  socket.on('yourid', function(data) {
    var num = data;
  });
  
  socket.on('disconnect', function (socket) {
    playerID -= 1;
  });

  socket.on('player1Points', data => {
    io.emit('player1Points', data);
  });
  socket.on('player2Points', data => {
    io.emit('player2Points', data);
  });
  socket.on('gamePoints', data => {
    io.emit('gamePoints', data);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
