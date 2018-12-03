import * as bcrypt from 'bcrypt';

import { Model } from './model';
import { Utilities } from '../utilities';
import { DbConnector } from '../dbConnector';

export class UserModel extends Model {
  tableName = 'users';
  connector = new DbConnector();
  selectableColumns = ['id', 'name', 'displayname', 'twitter', 'twitch', 'youtube'];

  getUsers(params, done) {
    let queryBuilder = this.connector.knex.select(this.selectableColumns)
      .from(this.tableName)
      .where('enabled', true);

    const allowedParams = {
      id: 'id',
      name: 'name'
    };

    queryBuilder = Utilities.handleQueryParams(params, allowedParams, queryBuilder);

    queryBuilder.then(users => done(null, users))
      .catch(err => done(err));
  }

  getSingleUser(id, done) {
    this.getUserById(id)
      .then(user => {
        return done(null, user);
      })
      .catch(err => done(err));
  }

  getUsersByMultpleIds(ids) {
    return this.connector.knex.select(this.selectableColumns)
      .from('users')
      .whereIn('id', ids);
  }

  getUserById(id) {
    return this.connector.knex.first(this.selectableColumns)
      .from(this.tableName)
      .where('id', id);
  }

  async getUserByIdSync(userId) {
    const user = await this.connector.knex.first(this.selectableColumns)
      .from(this.tableName)
      .where('id', userId);

    return user;
  }

  getUserByName(userName, done) {
    this.connector.knex.select(this.selectableColumns)
      .from(this.tableName)
      .whereRaw('name = lower(?)', [userName])
      .then(users => {
        if (users.length > 0) {
          return done(null, users[0]);
        } else {
          return done(Error('User not found'));
        }
      })
      .catch(err => done(err));
  }

  getUserByParameter(val, parameter, getFullData, done) {
    this.connector.knex.select(!getFullData ? this.selectableColumns : ['*'])
      .from(this.tableName)
      .where(parameter, val)
      .then(users => {
        if (users.length > 0) {
          return done(null, users[0]);
        } else {
          return done(Error('User not found'));
        }
      })
      .catch(err => done(err));
  }

  addUser(newUser, done) {
    // Number of bcrypt saltrounds to perform
    const saltRounds = 10;
    const tableName = this.tableName;

    // Hash password with bcrypt before storing in database
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
      if (err) {
        throw err;
      }

      newUser.displayname = newUser.name;
      newUser.name = newUser.name.toLowerCase();
      newUser.password = hash;

      this.connector.knex.insert(newUser)
        .into(tableName)
        .then(user => done(null, user))
        .catch(error => done(error));
    });
  }
}
