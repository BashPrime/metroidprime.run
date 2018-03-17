// Initialize database object
var knex = require('../queries');
var bcrypt = require('bcrypt');

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
  
    console.log(queryBuilder.toString());
    queryBuilder.then(users => done(null, users))
    .catch(err => done(err));
  },

  getUserById(userId, done) {
    knex.select(this.selectableColumns)
    .from(this.tableName)
    .where('id', userId)
    .then(user => done(null, user))
    .catch(err => done(err));
  },

  getUserByName(userName, done) {
    knex.select(this.selectableColumns)
    .from(this.tableName)
    .whereRaw('name = lower(?)', [userName])
    .then(user => done(null, user))
    .catch(err => done(err));
  },

  getUserByParamter(val, paramter, done) {
    knex.select(this.selectableColumns)
    .from(this.tableName)
    .where(paramter, val)
    .then(user => done(null, user))
    .catch(err => done(err));
  },

  addUser(newUser, done) {
    // Number of bcrypt saltrounds to perform
    const saltRounds = 10;

    // Hash password with bcrypt before storing in database
    bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
      if (err) {
        throw err;
      }

      newUser.displayname = newUser.name;
      newUser.name = newUser.name.toLowerCase();
      newUser.password = hash;

      knex.insert(newUser)
      .into(this.tableName)
      .then(user => done(null, user))
      .catch(err => done(err));
    });
  }
};