CREATE TABLE category_parents (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  shortname TEXT NOT NULL,
  sectionid INTEGER NOT NULL REFERENCES sections(id),
  gameid INTEGER NOT NULL REFERENCES games(id)
);
