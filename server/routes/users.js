var express = require('express');
var router = express.Router();

// Properties
const saltRounds = 10;

// Initialize database object
var db = require('../queries');

// Define routes
router.get('/', getAllUsers);
router.get('/:username', getSingleUser);
router.post('/register', registerUser);


// Router functions
function getAllUsers(req, res, next) {
  const obj = {
    columns: ['id', 'name', 'isenabled', 'userlevel', 'twitter', 'twitch', 'youtube']
  };

  db.any('select ${columns:name} from users', obj)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleUser(req, res, next) {
  const obj = {
    columns: ['id', 'name', 'isenabled', 'userlevel', 'twitter', 'twitch', 'youtube'],
    username: req.params.username
  };

  db.one('select ${columns:name} from users where lower(name) = lower(${username})', obj)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Returned user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function registerUser(req, res, next) {
  const bcrypt = require('bcrypt');

  // Hash password with bcrypt before storing in database
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if (err) {
      throw err;
    }
    req.body.password = hash;
    db.none('insert into users (${this:name}) values (${this:csv})', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Registered user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
  });
}

module.exports = router;
