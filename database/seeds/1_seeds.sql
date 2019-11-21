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


INSERT INTO games (game_type_id, creator_id, created_at, started_at, completed_at,  deleted_at,  game_state)
   VALUES (1, 3, '2019-11-17 15:40:25', NULL, NULL, NULL, NULL),
	(1, 3, '2019-11-17 15:50:25', NULL, NULL, NULL, NULL),10
	(2, 3, '2019-11-17 18:40:25', NULL, NULL, NULL, NULL),11
	(1, 3, '2019-11-17 18:50:25', NULL, NULL, NULL, NULL),12
	(1, 4, '2019-11-17 18:40:25', NULL, NULL, NULL, NULL),13
	(1, 4, '2019-11-17 18:40:25', NULL, NULL, NULL, NULL),14
	(2, 4, '2019-11-17 18:40:25', NULL, NULL, NULL, NULL),15
	(2, 4, '2019-11-17 18:40:25', NULL, NULL, NULL, NULL),16
	(1, 5, '2019-11-17 18:40:25', NULL, NULL, NULL, NULL),17
	(2, 5, '2019-11-17 18:40:25', NULL, NULL, NULL, NULL);18


INSERT INTO user_games ( user_id, game_id)
	VALUES (3, 9), 	(3,10), (3, 11), (3, 12), (4, 13), (4, 14), (4, 15), (4, 16), (5, 17), (5, 18);

32 games in total right now

INSERT INTO games (game_type_id, creator_id, created_at, started_at, completed_at,  deleted_at,  game_state)
   VALUES (1, 1, '2019-11-18 15:30:15', '2019-11-18 15:30:20', '2019-11-18 15:40:20', NULL, NULL),
(1, 2, '2019-11-18 16:30:15', '2019-11-18 16:30:20', '2019-11-18 16:45:20', NULL, NULL),
(1, 3, '2019-11-18 17:50:25', '2019-11-18 17:52:20', '2019-11-18 17:56:20', NULL, NULL),
(1, 3, '2019-11-19 08:40:25', '2019-11-19 09:02:20', '2019-11-19 09:05:20', NULL, NULL),
(1, 4, '2019-11-19 09:50:25', '2019-11-19 10:50:25', '2019-11-19 10:52:25', NULL, NULL),
(2, 4, '2019-11-19 18:40:25', '2019-11-19 18:55:25', '2019-11-19 18:58:25', NULL, NULL),
(2, 5, '2019-11-20 09:50:25', '2019-11-20 10:50:25', '2019-11-20 10:52:25', NULL, NULL),
(2, 5, '2019-11-20 10:40:25', '2019-11-20 10:55:25', '2019-11-20 10:58:25', NULL, NULL);


INSERT INTO user_games ( user_id, game_id)
	VALUES (1, 19), (2, 19), (2, 20),  (3, 20),  (3, 21),  (4, 21),  (3, 22),  (5, 22),  (4, 23),  (5, 23), 
	(4, 24), (3, 24), (2, 24),
	(5, 25), (3, 25), (2, 25), (1, 25),	
	(5, 26), (1, 26), (3, 26);

INSERT INTO winners ( user_id, game_id, winners_num)
	VALUES (1, 1, 1), (3, 2, 1), (1, 19, 1), (2, 20, 1), (3, 21, 1), (3, 22, 2), (5, 22, 2), (4, 23, 1),
  	(3, 24, 1),  
	(1, 25, 4), (2, 25, 4), (3, 25, 4), (5, 25, 4),
	(1, 26, 2), (3, 26, 2);









