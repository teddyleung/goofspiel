const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
require('dotenv').config()
const db = require('./db/index');

// TEMPLATING
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));

// PAGE ROUTES
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/games/:id', (req, res) => {
  res.render('game.ejs');
});

// TODO: Delete this route when done
app.get('/users', (req, res) => {
  db.getAllUsers()
    .then(users => {
      res.send(users);
    });
});

// SOCKET LOGIC
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('play', (msg) => {
    console.log('received message: ' + msg);
    io.emit('playReturn', 'received message: ' + msg);
  });
});

// START SERVER
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});