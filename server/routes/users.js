var express = require('express');
var router = express.Router();

// Initialize database object
var db = require('../queries');

// Define routes
router.get('/', getAllUsers);
router.get('/:username', getSingleUser);


// Router functions
function getAllUsers(req, res, next) {
  db.any('select * from users')
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
  var userName = req.params.username;
  db.one('select * from users where LOWER(name) = LOWER($1)', userName)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = router;
