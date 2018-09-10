CREATE TABLE users_games_roles (
  gameid INTEGER NOT NULL REFERENCES games(id),
  userid INTEGER NOT NULL REFERENCES users(id),
  roleid INTEGER NOT NULL REFERENCES roles(id),
  PRIMARY KEY(gameid, userid, roleid)
);
