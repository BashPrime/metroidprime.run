CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    authorid INTEGER NOT NULL REFERENCES users(id),
    date_submitted TIMESTAMP NOT NULL,
    slug VARCHAR(80) NOT NULL UNIQUE,
    hidden BOOLEAN DEFAULT FALSE
);
