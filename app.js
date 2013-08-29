var app, express;

express = require('express');

require('./chat');

app = express();

app.set('views', __dirname + '/views');

app.engine('html', require('ejs').renderFile);

app.use(express["static"](__dirname + '/public'));

app.get('/', function(req, res) {
  return res.render('index.html');
});

app.listen(8080);

/*
//@ sourceMappingURL=app.js.map
*/