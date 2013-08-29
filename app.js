var app, express;

express = require('express');

app = express();

app.set('views', __dirname + '/views');

app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  return res.render('index.html');
});

app.listen(8080);
