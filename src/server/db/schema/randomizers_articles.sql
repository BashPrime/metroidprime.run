CREATE TABLE randomizers_articles (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(80) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(250) NULL,
    content TEXT NOT NULL,
    categoryid INTEGER NOT NULL REFERENCES randomizers_articles_categories(id),
    last_updated_user INTEGER NOT NULL REFERENCES users(id),
    last_updated_date TIMESTAMP NOT NULL,
    randomizerid INTEGER NOT NULL REFERENCES randomizers(id)
);
