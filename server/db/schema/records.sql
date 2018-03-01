CREATE TABLE records (
    id SERIAL PRIMARY KEY,
    categoryId INTEGER NOT NULL REFERENCES categories(id),
    playerId INTEGER NOT NULL REFERENCES users(id),
    realTime INTEGER NOT NULL, -- milliseconds
    gameTime INTEGER NOT NULL, -- milliseconds
    comment VARCHAR(500) NULL,
    videoUrl VARCHAR(100) NULL,
    dateSubmitted timestamp NULL,
    userSubmittedId INTEGER NULL REFERENCES users(id),
    isHidden BOOLEAN DEFAULT FALSE,
    isRejected BOOLEAN DEFAULT FALSE,
    rejectMsg VARCHAR(500) NULL
);
