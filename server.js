const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var roomno = 1;
var count = 0;
io.on('connection', function(socket){
  if(count < 2) {
    socket.join(roomno);
    io.sockets.in(roomno).emit('connectToRoom', roomno);
    count = count + 1;
  }
   socket.on('disconnect', function () {
     socket.leave(roomno);
     count = count - 1;
   });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
