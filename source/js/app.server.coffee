express = require 'express'
app = express()

app.set('views', __dirname + '/views')
app.engine('html', require('ejs').renderFile)

app.get '/', (req, res)->
  res.render('index.html')

app.listen(8080)
