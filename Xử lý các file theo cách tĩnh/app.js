const express = require('express')
const app = express()

const path = require('path')

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'root.html'),)
})
app.get('/users', function (req, res) {
  
  res.sendFile(path.join(__dirname, 'views', 'users.html'),)
})


app.listen(3000)