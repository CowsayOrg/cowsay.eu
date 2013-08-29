io = require('socket.io').listen(1337)
messages = []

generate_name = (ip) ->
  'cowsayShow'

name = (socket) ->
  generate_name socket.handshake.address.address

io.sockets.on 'connection', (socket) ->
  socket.on 'msg', (data) ->
    console.log "Received message: #{data.msg} from #{name(socket)}"
    obj =
      text: data.msg
      author: name(socket)

    messages.push obj

    io.sockets.emit('msg', obj)

  socket.on 'connect', (data) ->

    #socket.emit 'history', history: messages


