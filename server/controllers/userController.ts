import { Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import { UserModel } from '../models/userModel';

export class UserController extends Controller {
    protected model: UserModel;

    constructor() {
        super();
        this.model = new UserModel();

        // Define routes
        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            this.getUsers(req, res, next);
        });
    }

    getUsers(req, res, next) {
        this.model.getUsers(req.query, (err, users) => {
            if (err) {
                return next(err);
            }

            return res.json({
                success: true,
                data: users
            });
        });
    }

    getModel() {
        return this.model;
    }
}
