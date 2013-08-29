var generate_name, io, messages, name;

io = require('socket.io').listen(1337);

messages = [];

generate_name = function(ip) {
  return console.log("generating name for " + ip.slice(-6));
};

name = function(socket) {
  return generate_name(socket.handshake.address.address);
};

io.sockets.on('connection', function(socket) {
  socket.emit('history', messages);
  socket.on('msg', function(data) {
    var obj;
    console.log("Received message: " + data.msg + " from " + (name(socket)));
    obj = {
      text: data.msg,
      author: name(socket)
    };
    messages.push(obj);
    return io.sockets.emit('msg', obj);
  });
  return socket.on('connect', function(data) {});
});

/*
//@ sourceMappingURL=chat.js.map
*/