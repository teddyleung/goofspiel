const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE
});

const getGameAndGameType = gameUuid => {
  return pool.query(`
    SELECT games.id, uuid, game_type_id, creator_id, created_at, started_at, completed_at, deleted_at, game_state, game_types.name as game_name, game_types.file_name, game_types.player_min, game_types.player_max
      FROM games
      JOIN game_types ON games.game_type_id = game_types.id
      WHERE uuid = $1
  `, [gameUuid])
    .then(games => games.rows[0]);
};

const getGameUsers = gameUuid => {
  return pool.query(`
    SELECT users.id, username
      FROM users
      JOIN user_games ON users.id = user_games.user_id
      JOIN games ON games.id = user_games.game_id
      WHERE games.uuid = $1
  `, [gameUuid])
    .then(users => users.rows);
};

const getGameData = gameUuid => {
  return Promise.all([getGameAndGameType(gameUuid), getGameUsers(gameUuid)])
    .then(([gameAndType, users]) => ({
      ...gameAndType,
      users
    }));
};

// TODO: Delete this
const getAllUsers = () => {
  return pool.query(`
    SELECT username FROM users;
  `)
    .then(res => res.rows);
};

module.exports = {
  getAllUsers,
  getGameData
}