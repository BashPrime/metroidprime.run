import * as passport from 'passport';
import * as bcrypt from 'bcrypt';
import * as passportJwt from 'passport-jwt';
import * as passportLocal from 'passport-local';

import * as config from '../config.json';
import * as users from '../models/users';

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const LocalStrategy = passportLocal.Strategy;
const incorrectUsernameOrPassword = 'Incorrect username or password.';

export function getPassportStrategies() {
  passport.use(new LocalStrategy((username, password, cb) => {
    //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    return users.getOneByNameAllColumns(username)
      .then(user => {
        // Return false if no user found
        if (!user) {
          return cb(null, false, { message: incorrectUsernameOrPassword });
        }

        // Verify password using bcrypt
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return cb(err);
          if (!isMatch) return cb(null, false, { message: incorrectUsernameOrPassword });
          return cb(null, user);
        });
      })
      .catch(err => cb(err));
  }
  ));

  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.server.token.secretKey
  }, (jwt_payload, cb) => {
    users.getOneById(jwt_payload.sub)
    .then(user => {
      if (!user) {
        return cb(null, false);
      }
      return cb(null, user);
    })
    .catch(err => cb(err, false));
}));
}
