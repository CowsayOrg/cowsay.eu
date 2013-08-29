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
    if (text.length !== 0) {
      this.socket.emit('msg', {
        msg: text
      });
      return $('#chat-input input').val('');
    }
  };

  Chat.prototype.handle_messages = function() {
    var _this = this;
    this.socket.on('msg', function(data) {
      return _this.add_message(data.author, data.text);
    });
    this.socket.on('history', function(data) {
      var msg, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        msg = data[_i];
        _results.push(_this.add_message(msg.author, msg.text));
      }
      return _results;
    });
    return this.socket.on('count', function(data) {
      return _this.set_count(data.count);
    });
  };

  Chat.prototype.set_count = function(count) {};

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
