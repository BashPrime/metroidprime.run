import { Model } from './model';
import { Utilities } from '../utilities';
import { DbConnector } from '../dbConnector';

export class UserModel extends Model {
  tableName = 'users';
  connector = new DbConnector();

  getUsers(params, done) {
    const selectableColumns = ['id', 'name', 'displayname', 'twitter', 'twitch', 'youtube'];
    let queryBuilder = this.connector.knex.select(selectableColumns).from(this.tableName);

    const allowedParams = {
      id: 'id',
      name: 'name'
    };

    queryBuilder = Utilities.handleQueryParams(params, allowedParams, queryBuilder);

    queryBuilder.then(users => done(null, users))
    .catch(err => done(err));
  }
}
