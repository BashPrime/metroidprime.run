CREATE TABLE users_roles (
  userid INTEGER NOT NULL REFERENCES users(id),
  roleid INTEGER NOT NULL REFERENCES roles(id),
  gameid INTEGER,
  PRIMARY KEY(userid, roleid, gameid)
);
