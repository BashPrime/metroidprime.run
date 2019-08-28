CREATE TABLE randomizers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    abbreviation TEXT NOT NULL,
    repository_url TEXT NOT NULL,
    download_url TEXT NOT NULL,
    support_url TEXT NOT NULL,
    gameid INTEGER NOT NULL REFERENCES games(id)
);
