CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  gameid INTEGER NOT NULL REFERENCES games(id)
);
