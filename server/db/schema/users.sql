CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL UNIQUE,
  displayname TEXT NOT NULL,
	password TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
  enabled BOOLEAN DEFAULT TRUE,
	userlevel SMALLINT DEFAULT 0,
	twitter TEXT NULL,
	twitch TEXT NULL,
	youtube TEXT NULL
);
