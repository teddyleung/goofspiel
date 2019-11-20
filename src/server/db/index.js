const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE
});

const getGame = gameUuid => {
  return pool.query(`
    SELECT id, uuid, game_type_id, creator_id, created_at, started_at, completed_at, deleted_at, game_state
      FROM games
      WHERE uuid = $1
  `, [gameUuid])
    .then(game => game.rows[0]);
};

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

const updateGameState = (gameUuid, game_state) => {
  return pool.query(`
    UPDATE games
      SET game_state = $1
      WHERE games.uuid = $2
      RETURNING id, uuid, game_type_id, creator_id, created_at, started_at, completed_at, deleted_at, game_state
  `, [game_state, gameUuid])
    .then(game => game.rows[0]);
};

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const suit = [1,2,3,4,5,6,7,8,9,10,11,12,13];

const createGameState = (playerOneUsername) => {
  return {
    cards: shuffle([...suit]),
    history: [{
      [playerOneUsername]: null
    }],
    players: {
      [playerOneUsername]: {
        cards: [...suit],
        order: 1
      }
    }
  };
};

const addNewGame = (game_file_name, username) => {
  return pool.query(`
    WITH new_game AS (
      INSERT INTO games (game_type_id, creator_id, game_state)
        VALUES ((SELECT id FROM game_types WHERE file_name = $1),
          (SELECT id FROM users WHERE username = $2), $3)
          RETURNING games.id
    ) INSERT INTO user_games (user_id, game_id)
      VALUES ((SELECT id FROM users WHERE username = $2), (SELECT id FROM new_game))
  `, [game_file_name, username, createGameState(username)])
    .then(res => res.rows[0]);
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
  getGameData,
  getGame,
  updateGameState,
  addNewGame
}