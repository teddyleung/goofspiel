INSERT INTO users (username, password)
  VALUES ('Alice', 'password'),
    ('Bob', 'password'),
    ('Chris', 'password'),
    ('David', 'password');

INSERT INTO games (game_type_id, creator_id)
  VALUES (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 1),
    (2, 2),
    (2, 3),
    (2, 4);

INSERT INTO user_games (user_id, game_id)
  VALUES (1, 1),
    (2, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (1, 5),
    (2, 5),
    (3, 5),
    (2, 6),
    (3, 7),
    (4, 8);