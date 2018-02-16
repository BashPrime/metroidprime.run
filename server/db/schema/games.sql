CREATE TABLE games (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    platformId INTEGER NOT NULL REFERENCES platforms(id)
);