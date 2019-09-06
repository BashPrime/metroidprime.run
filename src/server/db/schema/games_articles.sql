CREATE TABLE games_articles (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(80) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(250) NULL,
    content TEXT NOT NULL,
    categoryid INTEGER NOT NULL REFERENCES games_articles_categories(id),
    last_updated_user INTEGER NOT NULL REFERENCES users(id),
    last_updated_date TIMESTAMP NOT NULL,
    gameid INTEGER NOT NULL REFERENCES games(id)
);
