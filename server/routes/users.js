var express = require('express');
var passport = require('passport');
var utilities = require('../utilities');
var User = require('../models/user');
var router = express.Router();

// Properties
const saltRounds = 10;

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
    return res.json({
      success: true,
      data: users,
      message: 'Successfully retrieved users'
    });
  });
}

function userExists(req, res, next) {
  User.getUserByName(req.body.username, (err, user) => {
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
    return res.status(404).end();
  });
}

function emailExists(req, res, next) {
  User.getUserByParameter(req.body.email, 'email', false, (err, user) => {
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

function registerUser(req, res, next) {
  User.addUser(req.body, (err, user) => {
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

function getUserProfile(req, res, next) {
  User.getUserById(req.user.id, (err, user) => {
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

module.exports = router;
