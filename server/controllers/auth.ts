import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { Controller } from './controller';
import { UserModel } from '../models/user';
const config = require('../../config.json');

export class AuthController extends Controller {
    protected model = new UserModel();

    constructor() {
        super();

        // Define routes
        this.router.post('/', (req: Request, res: Response, next: NextFunction) => {
            this.authenticateUser(req, res, next);
        });
    }

    authenticateUser(req, res, next) {
        this.model.getUserByParameter(req.body.username.toLowerCase(), 'name', true, (err, user) => {
            if (err) {
                return next(err);
            }
            this.comparePassword(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                    return next(err);
                }
                if (!isMatch) {
                    // Invalid password, return unauthorized response
                    this.returnUnauthorizedCredentials(res);
                } else {
                    // Password accepted, generate JSON token and send in response
                    const payload = this.prepareJwtPayload(user);
                    const token = jwt.sign({ data: payload }, config.token.secretKey, {
                        expiresIn: config.token.expiresIn
                    });
                    return res.status(200)
                        .json({
                            success: true,
                            token: token,
                            user: payload
                        });
                }
            });
        });
    }

    comparePassword(candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) {
                callback(err);
            }
            callback(null, isMatch);
        });
    }

    returnUnauthorizedCredentials(res) {
        res.status(401)
            .json({
                success: false,
                message: 'Incorrect username or password.'
            });
    }

    prepareJwtPayload(user) {
        return {
            id: user.id,
            name: user.name,
            displayname: user.displayname,
            email: user.email
        };
    }
}
