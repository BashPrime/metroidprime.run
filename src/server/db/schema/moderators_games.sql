CREATE TABLE moderators_games (
  moderatorid INTEGER NOT NULL REFERENCES users(id),
  gameid INTEGER NOT NULL REFERENCES games(id),
  PRIMARY KEY(moderatorid, gameid)
);
