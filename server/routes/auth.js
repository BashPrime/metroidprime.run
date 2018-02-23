var express = require('express');
var config = require('../../config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var router = express.Router();

// Properties
const saltRounds = 10;

// Initialize database object
var db = require('../queries');

// Define routes
router.post('/', authenticateUser);


// Router functions
function authenticateUser(req, res, next) {
  db.one({
    name: 'find-user',
    text: 'select * from users where lower(name) = lower($1)',
    values: [req.body.username]
  })
  .then(user => {
    // User returned, verify password
    var candidatePassword = req.body.password;
    var hash = user.password;

    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if (err) {
        return next(err);
      }
      if (!isMatch) {
        // Invalid password, return unauthorized response
        res.status(401)
        .json({
          success: false,
          message: 'Wrong password'
        });
      } else {
        // Password accepted, generate JSON token and send in response
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };
        const token = jwt.sign(payload, config.token.privateKey);

        res.status(200)
        .json({
          success: true,
          token: 'JWT ' + token,
          message: 'Password accepted'
        });
      }
    });
  })
  .catch(err => {
    err.message = 'Username not recognized';
    return next(err);
  });
}

module.exports = router;
