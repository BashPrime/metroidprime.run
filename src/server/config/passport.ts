import * as passport from 'passport';
import * as bcrypt from 'bcrypt';
import { LocalStrategy } from 'passport-jwt';

import { getConnection } from "./database";
import * as users from '../models/users';

const knex = getConnection();
const incorrectUsernameOrPassword = 'Incorrect username or password.';

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
