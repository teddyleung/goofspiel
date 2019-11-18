const bcrypt = require('bcrypt');

module.exports = function(router, db) {

  router.post('/login', (req, res) => {
    const {username, password} = req.body;
    db.getUserByName(username)
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.name = user.username;
          res.redirect(`/room`);
          return;
        } else {
          console.log("Bad username or password, cannot login!", username, password);
          res.status(200).send({user: username, error: 'bad password'});
          return null;
        }
      })
      .catch(e => res.send(e));

  });

  router.post('/logout', (req, res) => {

    req.session.name = '';
    res.redirect(`/`);

  });

  // New user signup, insert to database
  router.post('/signup', (req, res) => {

    const newUser = req.body;
    db.getUserByName(newUser.username)
      .then(user => {
        console.log("get user?",user);
        if (!user) {
          newUser.password = bcrypt.hashSync(newUser.password, 12);
          db.addNewUser(newUser)
            .then(user => {
              req.session.name = user.username;
              res.redirect(`/room`);
              return;
            })
            .catch(e => res.send(e));
        } else {
          console.log("failed to create user.");
          res.status(200).send({user: newUser.username});
        }
      })
      .catch(e => res.send(e));

  });


  router.get('/', (req, res) => {
    res.render('index.ejs');
  });


  router.get("/login", (req, res) => {
    res.render(`login`, {name: 'username'});
  });

  router.get("/signup", (req, res) => {
    res.render(`signup`, {});
  });
    
  router.get("/archives", (req, res) => {
    res.render(`achives`);
  });


  router.get("/room", (req, res) => {
    // let templateVar = { };
    console.log('get to room');
    let myGameNum = {"goofspiel": 2, "goldfish": 1};
    let myGamesList = [
      {
        'id': 1,
        'type': 'goofspiel',
        'started_at': '2019-11-15 15:30:12',
        'player1': 'Alice',
        'player2': 'Tony',
        'status': 'On goging'
      },
      {
        'id': 2,
        'type': 'goofspiel',
        'started_at': '2019-11-16 16:30:12',
        'player1': 'Alice',
        'player2': 'Tony',
        'status': 'Ended'
      },
      {
        'id': 3,
        'type': 'goldfish',
        'started_at': '2019-11-17 15:40:12',
        'player1': 'Alice',
        'player2': 'Tony',
        'status': 'On goging'
      }
    ]; //for testing

    // res.render(`room`, {"userGames": "test"});
    res.render(`room`, {"gameNum": myGameNum, "userGames": myGamesList});
    // res.json(myGamesList);
  });
    
};

