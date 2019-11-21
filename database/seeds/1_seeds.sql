INSERT INTO users (username, password)
  VALUES ('Alice', 'password'),
    ('Bob', 'password'),
    ('Chris', 'password'),
    ('David', 'password');

INSERT INTO games (game_type_id, creator_id, game_state)
  VALUES (1, 1, '{"players": {"Alice": {"cards": [1,2,3,4,5,6,7,8,9,10,11,12,13], "order": 1}, "Bob": {"cards": [1,2,3,4,5,6,7,8,9,10,11,12,13], "order": 2}}, "history": [{"Alice": null, "Bob": null}], "cards": [13, 8, 5, 7, 4, 12, 10, 1, 3, 9, 2, 6, 11]}'),
    (1, 2, null),
    (1, 3, null),
    (1, 4, null),
    (2, 1, null),
    (2, 2, null),
    (2, 3, null),
    (2, 4, null);

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