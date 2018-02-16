var promise = require('bluebird');
var config = require('../config');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connectionSettings = {
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  port: config.database.port,
  database: config.database.database
}
var db = pgp(connectionSettings);

module.exports = db;
