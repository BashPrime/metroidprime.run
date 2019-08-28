CREATE TABLE randomizers_authors (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    randomizerid INTEGER NOT NULL REFERENCES randomizers(id)
);
