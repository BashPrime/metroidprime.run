CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  shortname TEXT NOT NULL,
  parentid INTEGER NOT NULL REFERENCES category_parents(id),
  allowsubmissions BOOLEAN DEFAULT TRUE,
  enabled BOOLEAN DEFAULT TRUE
);
