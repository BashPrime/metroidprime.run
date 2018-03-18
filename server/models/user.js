// Initialize database object
var knex = require('../queries');
var bcrypt = require('bcrypt');

var tableName = 'users';

module.exports = {
  tableName: 'users',
  selectableColumns: ['id', 'name', 'displayname', 'twitter', 'twitch', 'youtube'],

  getUsers(params = undefined, done) {
    var queryBuilder = knex.select(this.selectableColumns).from(this.tableName);
  
    var allowedParams = ['id', 'name'];
    var queryKeys = Object.keys(params).filter(function (e) { return this.indexOf(e) > -1; }, allowedParams);
  
    for (var i = 0; i < queryKeys.length; i++) {
      let queryParam = queryKeys[i];
      if (i === 0) {
        queryBuilder.where(queryParam, 'in', params[queryParam]);
      } else {
        queryBuilder.orWhere(queryParam, 'in', params[queryParam]);
      }
    }
  
    queryBuilder.then(users => done(null, users))
    .catch(err => done(err));
  },

  getUserById(userId, done) {
    knex(this.tableName)
    .where('id', userId)
    .then(users => {
      if (users.length > 0) {
        return done(null, users[0]);
      } else {
        return done(Error('User not found'));
      }
    })
    .catch(err => done(err));
  },

  getUserByName(userName, done) {
    knex(this.tableName)
    .whereRaw('name = lower(?)', [userName])
    .then(users => {
      if (users.length > 0) {
        return done(null, users[0]);
      } else {
        return done(Error('User not found'));
      }
    })
    .catch(err => done(err));
  },

  getUserByParameter(val, parameter, done) {
    knex(this.tableName)
    .where(parameter, val)
    .then(users => {
      if (users.length > 0) {
        return done(null, users[0]);
      } else {
        return done(Error('User not found'));
      }
    })
    .catch(err => done(err));
  },

  addUser(newUser, done) {
    // Number of bcrypt saltrounds to perform
    const saltRounds = 10;
    const tableName = this.tableName;

    // Hash password with bcrypt before storing in database
    bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
      if (err) {
        throw err;
      }

      newUser.displayname = newUser.name;
      newUser.name = newUser.name.toLowerCase();
      newUser.password = hash;

      knex.insert(newUser)
      .into(tableName)
      .then(user => done(null, user))
      .catch(err => done(err));
    });
  }
};