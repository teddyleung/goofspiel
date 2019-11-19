INSERT INTO users (username, password)
  VALUES ('Alice', 'password'),
    ('Bob', 'password'),
    ('Chris', 'password'),
    ('David', 'password');

INSERT INTO games (game_type_id, creator_id, created_at, started_at, completed_at,  deleted_at,  game_state)
   VALUES 
(1, 1, '2019-11-15 15:30:15', '2019-11-15 15:30:20', '2019-11-15 15:40:20', NULL, NULL),
(1, 2, '2019-11-15 16:30:15', '2019-11-15 16:30:20', '2019-11-15 16:45:20', NULL, NULL),
(1, 1, '2019-11-15 16:40:15', '2019-11-15 16:45:20', NULL, NULL, NULL),
(2, 2, '2019-11-16 17:40:15', '2019-11-16 17:40:15', NULL, NULL, NULL),
(2, 3, '2019-11-16 17:50:25', NULL, NULL, NULL, NULL),
(2, 4, '2019-11-16 17:54:15', NULL, NULL, NULL, NULL),
(1, 1, '2019-11-16 18:40:15', NULL, NULL, '2019-11-16 18:40:15', NULL),
(1, 1, '2019-11-16 18:40:25', NULL, NULL, '2019-11-16 18:40:15', NULL);

INSERT INTO user_games ( user_id, game_id)
	VALUES (1, 1), 	(2,1), (2, 2), (3, 2), (1, 3), (2, 3), (2, 4), (1, 4), (3, 4), (3, 5), (4, 6),
               (1,7),  (2,7),  (1,8);

