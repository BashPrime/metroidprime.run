import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import { Controller } from './controller';
import { UserModel } from '../models/user';

export class UserController extends Controller {
    protected model = new UserModel();

    constructor() {
        super();

        // Define routes
        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            this.getUsers(req, res, next);
        });
        this.router.get('/profile', passport.authenticate('jwt', { session: false }), (req: Request, res: Response, next: NextFunction) => {
            this.getUserProfile(req, res, next);
        });
        this.router.post('/userexists', (req: Request, res: Response, next: NextFunction) => {
            this.userExists(req, res, next);
        });
        this.router.post('/emailexists', (req: Request, res: Response, next: NextFunction) => {
            this.emailExists(req, res, next);
        });
        this.router.post('/register', (req: Request, res: Response, next: NextFunction) => {
            this.registerUser(req, res, next);
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

    userExists(req, res, next) {
        this.model.getUserByName(req.body.username, (err, user) => {
            if (err) {
                return res.status(200)
                    .json({
                        success: true,
                        message: 'Username is available'
                    });
            }
            return res.status(403)
                .json({
                    success: false,
                    message: 'Username is taken'
                });
        });
    }

    emailExists(req, res, next) {
        this.model.getUserByParameter(req.body.email, 'email', false, (err, user) => {
            if (err) {
                return res.status(200)
                    .json({
                        success: true,
                        message: 'Email is available'
                    });
            }
            return res.status(403)
                .json({
                    success: false,
                    message: 'Email is taken'
                });
        });
    }

    registerUser(req, res, next) {
        this.model.addUser(req.body, (err, user) => {
            if (err) {
                return next(err);
            }
            return res.status(200)
                .json({
                    success: true,
                    message: 'Successfully registered user'
                });
        });
    }

    getUserProfile(req, res, next) {
        this.model.getSingleUser(req.user.id, (err, user) => {
            if (err) {
                return next(err);
            }
            return res.json({
                success: true,
                data: user,
                message: 'Successfully retrieved user profile'
            });
        });
    }
}
