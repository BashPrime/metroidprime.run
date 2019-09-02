import { Router } from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

import * as users from '../models/users';
import * as config from '../config.json';

const router = Router();

// Define routes
router.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    if (!(username && password && email)) {
        res.status(422).json({ message: 'Request did not validate. Please ensure you are sending a username, password, and email.' });
        return;
    }

    users.create(username, password, email)
    .then(user => {
        res.json({ message: 'Successfully registered user.' });
    })
    .catch(err => {
        return res.status(500).json({ message: 'A server error occured while processing user registration.' });
    });
});

router.post('/login', function (req, res) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json(info);
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }

           const formattedUser = formatUser(user);
           const token = jwt.sign(formattedUser, config.server.token.secretKey, {
            subject: String(user.id), // subject can't be a number
            expiresIn: config.server.token.expiresIn
           });
           return res.json({user: formattedUser, token});
        });
    })(req, res);
});

function formatUser(user) {
    return {
        username: user.name,
        displayname: user.displayname,
        email: user.email
    };
}

export default router;
