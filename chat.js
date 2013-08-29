var adjectives, clients_count, generate_name, io, messages, name, names;

io = require('socket.io').listen(1337);

messages = [];

clients_count = 0;

adjectives = ['little', 'big', 'sweet', 'wet', 'horny', 'orange', 'ditry', 'stinky', 'slippy', 'fat', 'mad', 'funny'];

names = ['Harry', 'Lobster', 'Anonymous', 'Chuky', 'Random', 'Hipster', 'Guy', 'User', 'Guest', 'Mario', 'Plumber', 'Generic'];

generate_name = function(ip) {
  var adj1, adj2, name;
  console.log("generating name for " + ip.slice(-6));
  adj1 = Math.floor(Math.random() * adjectives.length);
  adj2 = Math.floor(Math.random() * adjectives.length);
  name = Math.floor(Math.random() * names.length);
  return "" + adjectives[adj1] + " " + adjectives[adj2] + " " + names[name];
};

name = function(socket) {
  return generate_name(socket.handshake.address.address);
};

io.sockets.on('connection', function(socket) {
  socket.name = name(socket);
  socket.emit('history', messages);
  socket.on('msg', function(data) {
    var obj;
    console.log("Received message: " + data.msg + " from " + socket.name);
    obj = {
      text: data.msg,
      author: socket.name
    };
    messages.push(obj);
    return io.sockets.emit('msg', obj);
  });
  socket.on('connect', function(data) {
    return io.sockets.emit('count', {
      count: clients_count++
    });
  });
  return socket.on('disconnect', function(socket) {
    clients_count -= 1;
    return io.sockets.emit('count', {
      count: clients_count
    });
  });
});
