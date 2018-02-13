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
var connectionString = 'postgres://localhost:5432/metroidprimerun';
var db = pgp(connectionString);

// add query functions

module.exports = db;
