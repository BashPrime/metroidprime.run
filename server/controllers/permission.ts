import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';

import { Controller } from './controller';
import { PermissionModel } from '../models/permission';
import { DbConnector } from '../dbConnector';

export class PermissionController extends Controller {
    protected model: PermissionModel;

    constructor(connector: DbConnector) {
        super();
        this.model = new PermissionModel(connector);

        // Define routes
        this.router.get('/', passport.authenticate('jwt', { session: false }), (req: Request, res: Response, next: NextFunction) => {
            this.getUserPermissions(req, res, next);
        });
    }

    private getUserPermissions(req, res, next) {
        this.model.getUserPermissions(req.user, (err, permissions) => {
            if (err) {
                return next(err);
            }

            return res.json({
                data: permissions
            });
        });
    }
}
