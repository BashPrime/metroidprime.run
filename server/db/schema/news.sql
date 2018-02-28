CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    authorId INTEGER NOT NULL REFERENCES users(id),
    dateSubmitted TIMESTAMP NOT NULL
);