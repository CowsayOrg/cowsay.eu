class Chat
  constructor: ->
    @socket = io.connect 'http://cowsay.eu:1337'
  add_message: (author, text) ->
    message_str = "<div class='message'><div class='author'>#{author}</div>" +
                  "<div class='text'>#{text}</div></div>"
    $('.chat-body').append message_str
  clear: ->
    $('.chat-body').html ''
  send_message: (text) ->
    @socket.emit 'msg', msg: text

  handle_messages: ->
    @socket.on 'msg', (data) =>
      @add_message(data.author, data.text)

$ ->
  chat = new Chat()
  $('#chat-input form').on 'submit', (ev) ->
    ev.preventDefault()
    chat.send_message $('#chat-input input').val()

  $('#chat-input button').on 'click', (ev) ->
    ev.preventDefault()
    chat.send_message $('#chat-input input').val()

  chat.handle_messages()

