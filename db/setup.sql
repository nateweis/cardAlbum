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
    desc TEXT,
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