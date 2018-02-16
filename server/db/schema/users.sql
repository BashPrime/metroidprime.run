CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	password TEXT NOT NULL,
	email TEXT NOT NULL,
	isEnabled BOOLEAN DEFAULT TRUE,
	userLevel SMALLINT DEFAULT 0,
	twitter TEXT NULL,
	twitch TEXT NULL,
	youtube TEXT NULL
);