import { DbConnector } from '../dbConnector';
import * as knex from 'knex';

export abstract class Model {
    protected abstract tableName: string;
    protected abstract connector: DbConnector;
}
