DROP DATABASE IF EXISTS card_app;
CREATE DATABASE card_app;
\c card_app;

CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(64), password TEXT);

CREATE TABLE cards(
    id SERIAL PRIMARY KEY,
    api_id INT,
    atk INT,
    def INT,
    level INT,
    name VARCHAR(42),
    race VARCHAR(16),
    type VARCHAR(24),
    attribute VARCHAR(16),
    descrip TEXT,
    card_images TEXT[]
);

CREATE TABLE albums(
    id SERIAL PRIMARY KEY,
    card_id INT,
    user_id INT,
    ammount INT,
    favorite BOOL
);

INSERT INTO users(username, password) VALUES ('nate', 'nate');
INSERT INTO cards(api_id, atk, def, level, name, race, type, attribute, descrip, card_images) VALUES (
    89631139,
    3000,
    2500,
    8,
    'Blue-Eyes White Dragon',
    'Dragon',
    'Normal Monster',
    'LIGHT',
    'This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.',
    ARRAY[
      'https://storage.googleapis.com/ygoprodeck.com/pics/89631139.jpg',
      'https://storage.googleapis.com/ygoprodeck.com/pics_small/89631139.jpg'
    ]
);