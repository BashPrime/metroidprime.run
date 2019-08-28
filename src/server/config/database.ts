import * as knex from 'knex';
import * as config from '../config.json';

let connection: knex<any, unknown[]>;

export function getConnection(): knex<any, unknown[]> {
    if (!connection) {
        connection = knex({
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
    
    return connection;
};
