CREATE TABLE subcategories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  label TEXT NOT NULL,
  parentid INTEGER NOT NULL REFERENCES categories(id),
  allowsubmissions BOOLEAN DEFAULT TRUE,
  enabled BOOLEAN DEFAULT TRUE
);
