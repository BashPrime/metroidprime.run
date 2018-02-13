var promise = require('bluebird');
var config = require('../config');

var options = {
  // Initialization Options
  promiseLib: promise
};

var connection = {
  host: config.database.host,
  user: config.database.user || 'localhost',
  password: config.database.password,
  database: config.database.password || 'metroidprimerun'
}

var pgp = require('pg-promise')(options);
var connectionSettings = {
  host: config.database.host || 'localhost',
  user: config.database.user,
  password: config.database.password,
  port: config.database.port || 5432,
  database: config.database.database || 'metroidprimerun'
}
var db = pgp(connectionSettings);

module.exports = db;
