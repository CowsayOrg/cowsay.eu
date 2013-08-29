io = require('socket.io').listen(1337)
messages = []

generate_name = (ip) ->
  console.log "generating name for #{ip[-6..-1]}"



name = (socket) ->
  generate_name socket.handshake.address.address

io.sockets.on 'connection', (socket) ->
  socket.emit 'history', messages
  socket.on 'msg', (data) ->
    console.log "Received message: #{data.msg} from #{name(socket)}"
    obj =
      text: data.msg
      author: name(socket)

    messages.push obj

    io.sockets.emit('msg', obj)

  socket.on 'connect', (data) ->

    #socket.emit 'history', history: messages


