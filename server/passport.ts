const config = require('../config.json');
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from './models/user';

export class PassportHandler {
    private jwt;
    private secretKey;
    private user = new UserModel();

    constructor(passport) {
        const opts: { jwtFromRequest, secretOrKey } = { jwtFromRequest: undefined, secretOrKey: undefined };
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = config.token.secretKey;
        passport.use(new Strategy(opts, (jwt_payload, done) => {
            console.log(jwt_payload.data.id);
            this.user.getUserByParameter(jwt_payload.data.id, 'id', true, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user.enabled) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }));
    }
}
