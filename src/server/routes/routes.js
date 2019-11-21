const bcrypt = require('bcrypt');
const helpers = require('../../lib/helpers');

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
          console.log("Already exists, failed to create user.");
          res.redirect(`/`);
          // res.status(200).send({user: newUser.username});
        }
      })
      .catch(e => res.send(e));
  });

  router.get('/', (req, res) => {
    if (!req.session.name) {
      if (req.query["form"]) {
        res.render(`login`, {"loginType": req.query["form"], "accountName": req.session.name});
      } else {
        res.render(`login`, {"loginType": 'login', "accountName": req.session.name});
      }
    } else {
      res.redirect('/room');
    }
  });

  router.get("/games/new", (req, res) => {
    const username = req.session.name;
    if (!username) {
      return res.redirect('/');
    }
    
    res.render(`newgame`, {"accountName": req.session.name});
  });


  router.get("/login", (req, res) => {
    res.render(`login`, {"accountName": req.session.name});
  });

  router.get("/signup", (req, res) => {
    res.render(`signup`, {"accountName": req.session.name});
  });
    
  router.get("/games", (req, res) => {
    const username = req.session.name;
    if (!username) {
      return res.redirect('/');
    }

    db.getOpenGames(username)
      .then(gameData => {
        let allGames = helpers.formatGameData(gameData);
        let gameTypes = helpers.getAllGamesName(allGames, 'name');
        let gameFileNames = helpers.getAllGamesName(allGames, 'file_name');
        res.render(`games`, {"accountName": req.session.name,"gameTypes": gameTypes, "fileNames": gameFileNames, "userGames": allGames});
        return;
      })
      .catch(e => res.send(e));
  });

  router.get("/room", (req, res) => {
    const username = req.session.name;
    if (!username) {
      return res.redirect('/');
    }
    
    db.getMyGamesList(username)
      .then(gameData => {
        let allGames = helpers.formatGameData(gameData);
        let gameTypes = helpers.getAllGamesName(allGames, 'name');
        let gameFileNames = helpers.getAllGamesName(allGames, 'file_name');
        res.render(`room`, {"accountName": req.session.name, "gameTypes": gameTypes, "fileNames": gameFileNames, "userGames": allGames});
        return;
      })
      .catch(e => res.send(e));
  });
   
  router.get("/leaderboard", (req, res) => {
    const username = req.session.name;
    if (!username) {
      return res.redirect('/');
    }
    
    db.getLeaderBoardStat()
      .then(userScores => {
        let gameTypes = helpers.getAllGamesName(userScores, 'game_name');
        res.render(`leaderboard`, {"accountName": req.session.name, "gameTypes": gameTypes, "userScores": userScores});
        return;
      })
      .catch(e => res.send(e));
  });

  router.get('/archives', (req, res) => {
    const username = req.session.name;
    if (!username) {
      res.redirect('/');
    }
  });

  router.get('/archives/:username', (req, res) => {
    const username = req.session.name;
    if (!username) {
      res.redirect('/');
    } else {
      db.getMyCompletedGames(username)
        .then(allCompletedGames => {
          const newCompletedGames = allCompletedGames.map(game => ({
            ...game,
            completed_at: helpers.formatGameDate(game.completed_at)
          }));
          console.log(newCompletedGames);
          res.render(`archives`, {"accountName": username, "completedGames": newCompletedGames});
          return;
        })
        .catch(e => res.send(e));
    }
  });
};

