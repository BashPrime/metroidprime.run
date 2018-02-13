var express = require('express');
var router = express.Router();

// Initialize database object
var db = require('../queries');

// Define routes
router.get('/', getAllUsers);


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

module.exports = router;
