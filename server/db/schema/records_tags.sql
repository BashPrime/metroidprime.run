CREATE TABLE records_tags (
  recordid INTEGER NOT NULL REFERENCES records(id),
  tagid INTEGER NOT NULL REFERENCES tags(id),
  PRIMARY KEY(recordid, tagid)
);
