CREATE TABLE category_tags (
  id INTEGER PRIMARY KEY,
  categoryid INTEGER REFERENCES categories(id),
  tag TEXT NOT NULL,
  name TEXT NOT NULL,
  enabled BOOLEAN DEFAULT TRUE
);
