import { Model } from './model';
import { DbConnector } from '../dbConnector';
import { Utilities } from '../utilities';

export class NewsModel extends Model {
    tableName = 'news';
    connector = new DbConnector();

    getNews(params = undefined, done) {
        let queryBuilder = this.connector.knex.select({
            id: 'news.id',
            title: 'news.title',
            content: 'news.content',
            authorid: 'news.authorid',
            author: 'authorusers.displayname',
            submitted: 'news.submitted',
            slug: 'news.slug'
        })
            .from(this.tableName)
            .where('news.hidden', false)
            .leftJoin('users as authorusers', 'news.authorid', 'authorusers.id');

        const allowedParams = {
            id: 'news.id',
            slug: 'news.slug',
            authorid: 'news.authorid',
            author: 'authorusers.name'
        };

        queryBuilder = Utilities.handleQueryParams(params, allowedParams, queryBuilder);

        queryBuilder.then(news => done(null, news))
            .catch(err => done(err));
    }
}
