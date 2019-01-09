import { Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import { RecordModel } from '../models/record';
import { DbConnector } from '../dbConnector';

export class RecordController extends Controller {
    protected model: RecordModel;

    constructor(connector: DbConnector) {
        super();
        this.model = new RecordModel(connector);

        // Define routes
        this.router.get('/latest', (req: Request, res: Response, next: NextFunction) => {
            this.getLatestRecords(req, res, next);
        });
    }

    getLatestRecords(req, res, next) {
        this.model.getLatestRecords((err, records) => {
            if (err) {
                return next(err);
            }
            return res.json({
                success: true,
                data: records
            });
        });
    }
}
