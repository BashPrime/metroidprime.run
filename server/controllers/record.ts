import { Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import { RecordModel } from '../models/record';

export class RecordController extends Controller {
    protected model = new RecordModel();

    constructor() {
        super();

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
