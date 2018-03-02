var express = require('express');
var passport = require('passport');
var utilities = require('../utilities');
var router = express.Router();

// Properties
const saltRounds = 10;

// Initialize database object
var db = require('../queries');

// Define routes
router.get('/', getUsers);
router.get('/profile', passport.authenticate('jwt', { session: false }), getUserProfile);
router.post('/userexists', userExists);
router.post('/emailexists', emailExists);
router.post('/register', registerUser);


// Router functions
function getUsers(req, res, next) {
  var sql = 'select ${columns:name} from users';
  const obj = {
    columns: ['id', 'name', 'displayname', 'twitter', 'twitch', 'youtube'],
    where: {
      id: req.query.id,
      name: req.query.name
    }
  };

  // Build where clause
  var where = utilities.buildWhereClause(obj.where, 'or', 'where');

  if (where)
    sql += where;

  db.any(sql, obj)
    .then(function (data) {
      res.status(200)
        .json({
          success: true,
          data: data,
          message: 'Successfully retrieved users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function userExists(req, res, next) {
  const obj = {
    columns: ['id'],
    username: req.body.username
  };

  db.one('select ${columns:name} from users where name = lower(${username})', obj)
    .then(function (data) {
      res.status(403)
        .json({
          success: false,
          message: 'Username is taken'
        });
    })
    .catch(function (err) {
      res.status(200)
        .json({
          success: true,
          message: 'Username is available'
        });
    });
}

function emailExists(req, res, next) {
  const obj = {
    columns: ['id'],
    email: req.body.email
  };

  db.one('select ${columns:name} from users where lower(email) = lower(${email})', obj)
    .then(function (data) {
      res.status(403)
        .json({
          success: false,
          message: 'Email is taken'
        });
    })
    .catch(function (err) {
      res.status(200)
        .json({
          success: true,
          message: 'Email is available'
        });
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
