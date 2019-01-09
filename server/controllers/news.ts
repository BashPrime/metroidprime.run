import { Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import { NewsModel } from '../models/news';
import { DbConnector } from '../dbConnector';

export class NewsController extends Controller {
    protected model: NewsModel;

    constructor(connector: DbConnector) {
        super();
        this.model = new NewsModel(connector);

        // Define routes
        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            this.getNews(req, res, next);
        });
    }

    getNews(req, res, next) {
        this.model.getNews(req.query, (err, news) => {
            if (err) {
                return next(err);
            }
            return res.json({
                success: true,
                data: news,
                message: 'Retrieved ' + news.length + ' news entries'
            });
        });
    }
}
