import { Model } from './model';
import { DbConnector } from '../dbConnector';

export class GameModel extends Model {
    tableName = 'users';
    connector = new DbConnector();

    getGames(done) {
        this.connector.knex.select('*')
            .from('games')
            .then(games => {
                return done(null, games);
            })
            .catch(err => {
                return done(err);
            });
    }

    getGameById(gameId, done) {
        this.connector.knex.select('*')
            .from('games')
            .where('id', gameId)
            .then(games => {
                return done(null, games);
            })
            .catch(err => {
                return done(err);
            });
    }
}
