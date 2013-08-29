express = require 'express'
require './chat'

app = express()

app.set('views', __dirname + '/views')
app.engine('html', require('ejs').renderFile)

app.use(express.static(__dirname + '/public'))
app.get '/', (req, res)->
  res.render('index.html')

app.listen(80)
