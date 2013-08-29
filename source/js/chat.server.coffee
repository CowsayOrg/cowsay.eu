messages = []

io.sockets.on 'connection', ->
  socket.on 'msg', (data) ->
    messages.push
      msg: data.msg
      author: data.author

  io.sockets.emit('msg', data)

  socket.on 'connect', (data) ->
    address = socket.handshake.address
    name = generate_name address.address

    socket.emit 'user',    name: name
    socket.emit 'history', history: messages


