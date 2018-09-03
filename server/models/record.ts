import { Model } from './model';
import { DbConnector } from '../dbConnector';
import { Utilities } from '../utilities';

export class RecordModel extends Model {
    tableName = 'records';
    connector = new DbConnector();

    async getLatestRecords(done) {
        const queryBuilder = this.connector.knex.select({
            id: 'records.id',
            categoryid: 'records.categoryid',
            category: 'categories.name',
            game: 'games.name',
            playerid: 'records.playerid',
            player: 'playerusers.displayname',
            realtime: 'records.realtime',
            gametime: 'records.gametime',
            escapetime: 'records.escapetime',
            comment: 'records.comment',
            videourl: 'records.videourl',
            date: 'records.date',
            submitted: 'records.submitted',
            submitterid: 'records.submitterid',
        })
            .from('records')
            .where('records.rejected', false)
            .leftJoin('categories', 'records.categoryid', 'categories.id')
            .leftJoin('games', 'categories.gameid', 'games.id')
            .leftJoin('users as playerusers', 'records.playerid', 'playerusers.id')
            .orderBy('date', 'desc')
            .limit(5)
            .then(runs => {
                console.log(runs);
                return done(null, runs);
            })
            .catch(err => done(err));
    }
}
