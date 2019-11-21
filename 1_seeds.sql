INSERT INTO users (username, password)
  VALUES ('Alice', 'password'),
    ('Bob', 'password'),
    ('Chris', 'password'),
    ('David', 'password');

INSERT INTO game_types (name, player_min, player_max)
  VALUES ('goofspiel', '2', '2'),
    ('goldfish', '2', '2');

INSERT INTO games (game_type, creator_id, created_at, started_at, completed_at,  deleted_at,  game_state)
   VALUES (1, 1, '2019-11-15 15:30:15', '2019-11-15 15:30:20', '2019-11-15 15:40:20', NULL, NULL),
	(1, 2, '2019-11-15 16:30:15', '2019-11-15 16:30:20', '2019-11-15 16:45:20', NULL, NULL),
	(1, 1, '2019-11-15 16:40:15', '2019-11-15 16:45:20', NULL, NULL, NULL),
	(2, 2, '2019-11-15 17:40:15', NULL, NULL, NULL, NULL);

INSERT INTO user_games ( users_id, game_id)
	VALUES (1, 1), 	(2,1), (1, 2), (3, 2), (3, 3), (2, 3), (1, 4);
