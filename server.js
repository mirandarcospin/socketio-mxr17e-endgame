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
  
  socket.on('gamePoints', data => {
    x = data;
    io.emit('gamePoints', data);
  });

  if(x % 2 != 0) {
    if(playerID % 2 != 0) {
      socket.on('player1Points', data => {
        io.emit('player1Points', data);
      });
    }
  }
  else if(x % 2 == 0) {
    if(playerID % 2 == 0){
      socket.on('player2Points', data => {
        io.emit('player2Points', data);
      });
    }
  }
  
  socket.on('disconnect', function (socket) {
    playerID -= 1;
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
