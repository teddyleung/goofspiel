const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');

// TEMPLATING
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));

// PAGE ROUTES
app.get('/', function (req, res) {
  res.render('index.ejs');
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});