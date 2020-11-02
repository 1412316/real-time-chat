const express = require('express');
const path = require('path');

const app = express();

const http = require('http').createServer(app);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('sendMessage', msg => {
    //console.log(msg);
    socket.broadcast.emit('sendToAll', msg);
  });
});

http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});