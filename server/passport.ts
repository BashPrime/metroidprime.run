const config = require('../config.json');
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from './models/user';
import { DbConnector } from './dbConnector';

export class PassportHandler {
    private user: UserModel;
    private connector: DbConnector;

    constructor(passport, connector: DbConnector) {
        this.connector = connector;
        this.user = new UserModel(this.connector);
        const opts: { jwtFromRequest, secretOrKey } = { jwtFromRequest: undefined, secretOrKey: undefined };
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = config.token.secretKey;
        passport.use(new Strategy(opts, (jwt_payload, done) => {
            this.user.getUserByParameter(jwt_payload.data.id, 'id', true, (err, user) => {
                if (err) {
                    return done(err, false);
                }

                if (user.enabled) {
                    return done(null, user);
                }

                return done(null, false);
            });
        }));
    }
}
