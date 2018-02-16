CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    gameId INTEGER NOT NULL REFERENCES games(id),
    allowSubmissions BOOLEAN NOT NULL
);