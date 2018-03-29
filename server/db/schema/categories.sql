CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  label TEXT NOT NULL,
  sectionid INTEGER NOT NULL REFERENCES sections(id),
  gameid INTEGER NOT NULL REFERENCES games(id),
  timing TEXT NOT NULL,
  defaulttag INTEGER NULL
);
