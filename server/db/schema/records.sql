CREATE TABLE records (
    id SERIAL PRIMARY KEY,
    subcategoryid INTEGER NOT NULL REFERENCES subcategories(id),
    playerid INTEGER NOT NULL REFERENCES users(id),
    realtime INTEGER NOT NULL, -- milliseconds
    gametime INTEGER NOT NULL, -- milliseconds
    comment VARCHAR(500) NULL,
    videourl VARCHAR(100) NULL,
    submitted timestamp NULL,
    submitterid INTEGER NULL REFERENCES users(id),
    hidden BOOLEAN DEFAULT FALSE,
    rejected BOOLEAN DEFAULT FALSE,
    rejectMsg VARCHAR(500) NULL
);
