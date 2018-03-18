var express = require('express');
var config = require('../../config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var router = express.Router();

// Define routes
router.post('/', authenticateUser);

// Router functions
function authenticateUser(req, res, next) {
  User.getUserByName(req.body.username, (err, user) => {
    if (err) {
      return next(err);
    }
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

function comparePassword(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) {
      callback(err);
    }
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
