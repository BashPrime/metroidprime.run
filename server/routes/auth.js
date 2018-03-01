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
    text: 'select * from users where name = lower($1)',
    values: [req.body.username]
  })
  .then(user => {
    // User returned, verify password
    comparePassword(req.body.password, user.password, (err, isMatch) => {
      if (err) {
        return next(err);
      }

      if (!isMatch) {
        // Invalid password, return unauthorized response
        returnUnauthorizedCredentials(res);
      } else {
        // Password accepted, generate JSON token and send in response
        const payload = prepareJwtPayload(user);
        const token = jwt.sign({data: payload}, config.token.secretKey, {
          expiresIn: config.token.expiresIn
        });

        res.status(200)
        .json({
          success: true,
          token: token,
          user: payload
        });
      }
    });
  })
  .catch(err => {
    returnUnauthorizedCredentials(res);
  });
}

function comparePassword(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
}

function returnUnauthorizedCredentials(res) {
  res.status(401)
  .json({
    success: false,
    message: 'Incorrect username or password.'
  });
}

function prepareJwtPayload(user) {
  return {
    id: user.id,
    name: user.name,
    displayname: user.displayname,
    email: user.email
  };
}

module.exports = router;
