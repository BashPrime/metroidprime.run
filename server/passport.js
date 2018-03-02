const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config');
const db = require('./queries');

module.exports = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.token.secretKey;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    const obj = {
      columns: ['id', 'name', 'enabled', 'userlevel'],
      id: jwt_payload.data.id
    };
    db.one('select ${columns:name} from users where id = ${id}', obj)
      .then(function (user) {
        if (user && user.enabled) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(function (err) {
        return done(err, false);
      });
  }));
}