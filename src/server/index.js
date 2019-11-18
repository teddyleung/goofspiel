const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()
const db = require('./db/index');

// TEMPLATING
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

// PAGE ROUTES
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/games', (req, res) => {
  res.render('games');
});

app.get('/games/:uuid', (req, res) => {
  db.getGameData(req.params.uuid)
    .then(data => {
      if (!data.created_at || data.completed_at || data.deleted_at) {
        return res.redirect('/games');
      }
      // TODO validate user
        // If not started, proceed regardless of user. If started but not a player, redirect to /games

      res.render('game', {
        file_name: data.file_name,
        game_state: data.game_state,
        users: data.users,
        uuid: data.uuid
      });
    });
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
  
  // TODO: join needs validation. Game exist? User authorized?
  socket.on('join', msg => {
    socket.join(msg.uuid, () => {
      console.log('joined' + msg.uuid);
    });
  });

  socket.on('gsp-button', msg => {
    console.log('received message from', msg.uuid);
    io.to(msg.uuid).emit('gsp-button', 'we heard the click');
  });
});

// START SERVER
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});