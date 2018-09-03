import { Model } from './model';
import { DbConnector } from '../dbConnector';

export class GameModel extends Model {
    tableName = 'users';
    connector = new DbConnector();

    getGameById(gameId, done) {
        this.connector.knex.select('*')
            .from('games')
            .where('id', gameId)
            .then(games => {
                if (games.length === 1) {
                    return games[0];
                } else {
                    return done(null, null);
                }
            })
            .catch(err => {
                return done(err);
            });
    }

    async getGameByIdSync(id) {
        const games = await this.connector.knex.select('*')
            .from('games')
            .where('id', id);

        if (games.length === 1) {
            return games[0];
        } else {
            return undefined;
        }
    }
}
