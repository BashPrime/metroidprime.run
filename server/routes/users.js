var express = require('express');
var passport = require('passport');
var utilities = require('../utilities');
var User = require('../models/user');
var router = express.Router();

// Properties
const saltRounds = 10;

// Initialize database object
var knex = require('../queries');

// Define routes
router.get('/', getUsers);
router.get('/profile', passport.authenticate('jwt', { session: false }), getUserProfile);
router.post('/userexists', userExists);
router.post('/emailexists', emailExists);
router.post('/register', registerUser);


// Router functions
function getUsers(req, res, next) {
  User.getUsers(req.query, (err, users) => {
    if (err) {
      return next(err);
    }
    if (users) {
      return res.json({
        success: true,
        data: users,
        message: 'Successfully retrieved users'
      });
    }
    return res.status(404).end();
  });
}

function userExists(req, res, next) {
  User.getUserByName(req.body.username, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user && user.length > 0) {
      return res.status(403)
      .json({
        success: false,
        message: 'Username is taken'
      });
    } else {
      return res.status(200)
      .json({
        success: true,
        message: 'Username is available'
      });
    }
    return res.status(404).end();
  });
}

function emailExists(req, res, next) {
  User.getUserByParamter(req.body.email, 'email', (err, user) => {
    if (err) {
      return next(err);
    }
    if (user && user.length > 0) {
      return res.status(403)
      .json({
        success: false,
        message: 'Email is taken'
      });
    } else {
      return res.status(200)
      .json({
        success: true,
        message: 'Email is available'
      });
    }
    return res.status(404).end();
  });
}

function registerUser(req, res, next) {
  const bcrypt = require('bcrypt');

  // Hash password with bcrypt before storing in database
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) {
      throw err;
    }
    req.body.displayname = req.body.name;
    req.body.name = req.body.name.toLowerCase();
    req.body.password = hash;
    db.none('insert into users (${this:name}) values (${this:csv})', req.body)
      .then(function () {
        res.status(200)
          .json({
            success: true,
            message: 'Successfully registered user'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  });
}

function getUserProfile(req, res, next) {
  res.json({ user: req.user });
}

module.exports = router;
