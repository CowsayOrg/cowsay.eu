var Chat;

Chat = (function() {
  function Chat() {
    this.socket = io.connect('http://cowsay.eu:1337');
  }

  Chat.prototype.add_message = function(author, text) {
    var message_str;
    message_str = ("<div class='message'><div class='author'>" + author + "</div>") + ("<div class='text'>" + text + "</div></div>");
    return $('.chat-body').append(message_str);
  };

  Chat.prototype.clear = function() {
    return $('.chat-body').html('');
  };

  Chat.prototype.send_message = function(text) {
    return this.socket.emit('msg', {
      msg: text
    });
  };

  Chat.prototype.handle_messages = function() {
    var _this = this;
    return this.socket.on('msg', function(data) {
      return _this.add_message(data.author, data.text);
    });
  };

  return Chat;

})();

$(function() {
  var chat;
  chat = new Chat();
  $('#chat-input form').on('submit', function(ev) {
    ev.preventDefault();
    return chat.send_message($('#chat-input input').val());
  });
  $('#chat-input button').on('click', function(ev) {
    ev.preventDefault();
    return chat.send_message($('#chat-input input').val());
  });
  return chat.handle_messages();
});

/*
//@ sourceMappingURL=chat.js.map
*/