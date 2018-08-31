const config = require('../config.json');
import * as knex from 'knex';

export class DbConnector {
  knex: knex = knex({
    client: 'pg',
    connection: {
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      port: config.database.port,
      database: config.database.database
    }
  });
}
