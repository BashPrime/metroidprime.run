var config = require('../config');

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.database
  }
});

module.exports = knex;
