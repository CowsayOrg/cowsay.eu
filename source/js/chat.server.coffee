io = require('socket.io').listen(1337)
messages = []
clients_count = 0

adjectives = ['little','big','sweet','wet','horny','orange','ditry','stinky','slippy','fat','mad','funny']
names = ['Harry','Lobster','Anonymous','Chuky','Random','Hipster','Guy','User','Guest','Mario','Plumber','Generic']

generate_name = (ip) ->
  console.log "generating name for #{ip[-6..-1]}"
  adj1 = Math.floor(Math.random() * adjectives.length)
  adj2 = Math.floor(Math.random() * adjectives.length)
  name = Math.floor(Math.random() * names.length)

  "#{adjectives[adj1]} #{adjectives[adj2]} #{names[name]}"

name = (socket) ->
  generate_name socket.handshake.address.address

io.sockets.on 'connection', (socket) ->
  socket.name = name(socket)
  socket.emit 'history', messages

  socket.on 'msg', (data) ->
    console.log "Received message: #{data.msg} from #{socket.name}"
    obj =
      text: data.msg
      author: socket.name

    messages.push obj

    io.sockets.emit 'msg', obj

  socket.on 'connect', (data) ->
    io.sockets.emit 'count', count: clients_count++

  socket.on 'disconnect', (socket)->
    clients_count -= 1
    io.sockets.emit 'count', count: clients_count


