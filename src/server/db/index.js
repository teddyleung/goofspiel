const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,    //my db needs a password
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE
});

const getAllUsers = () => {
  return pool.query(`
    SELECT username FROM users;
  `)
    .then(res => res.rows);
};

const getUserByName = (name) => {
  return pool.query(`
    SELECT username, password
    FROM users
    WHERE username = $1 ;`, [name])
    .then((res) => {
      console.log("test login in db", res.rows[0]);
      return res.rows[0] || null;
    })
    .catch(err => console.error('query error', err.stack));

};

const addNewUser = (user) => {

  return pool.query(`
    INSERT INTO users(username, password) 
    VALUES($1, $2) RETURNING *
    `, [user.username, user.password])
    .then((res) => res.rows[0] || null)
    .catch(err => console.error('query error', err.stack));

};

// games user has joined
const getUserGames = (user) => {
  return pool.query(`
    SELECT game_type, creator_id
    FROM games
    JOIN user_games
    JOIN users ON users.id = games.user_id
    WHERE users.name = user.username
    VALUES($1, $2) RETURNING *
    `, [user.username, user.password])
    .then((res) => res.rows[0] || null)
    .catch(err => console.error('query error', err.stack));
  
};

module.exports = {
  getAllUsers,
  getUserByName,
  addNewUser,
  getUserGames
};