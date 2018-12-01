import { Model } from './model';
import { DbConnector } from '../dbConnector';

export class GameModel extends Model {
    tableName = 'games';
    connector = new DbConnector();

    getGames(done) {
        this.connector.knex.select('*')
            .from(this.tableName)
            .limit(10)
            .then(games => {
                return done(null, games);
            })
            .catch(err => {
                return done(err);
            });
    }

    getDetailedGameById(id, done) {
        // Allow checking id or abbreviated name
        const column = isNaN(Number(id)) ? 'abbreviation' : 'id';

        this.connector.knex.first('*')
            .from(this.tableName)
            .where(column, id)
            .then(game => {
                return done(null, game);
            })
            .catch(err => {
                return done(err);
            });
    }
}
