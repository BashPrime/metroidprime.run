CREATE TABLE games (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    abbreviation TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL DEFAULT 'default.jpg',
    banner TEXT NOT NULL DEFAULT 'default.jpg'
);
