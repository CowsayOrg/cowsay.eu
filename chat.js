var messages;

messages = [];

io.sockets.on('connection', function() {
  socket.on('msg', function(data) {
    return messages.push({
      msg: data.msg,
      author: data.author
    });
  });
  io.sockets.emit('msg', data);
  return socket.on('connect', function(data) {
    var address, name;
    address = socket.handshake.address;
    name = generate_name(address.address);
    socket.emit('user', {
      name: name
    });
    return socket.emit('history', {
      history: messages
    });
  });
});

/*
//@ sourceMappingURL=chat.js.map
*/