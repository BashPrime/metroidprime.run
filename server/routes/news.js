var express = require('express');
var config = require('../../config');
var router = express.Router();

// Initialize database object
var db = require('../queries');

// Define routes
router.get('/', getAllNews);

// Router functions
function getAllNews(req, res, next) {
  db.any('select news.*, users.name as author from news left outer join users on (news.authorid = users.id)')
    .then(function (data) {
      res.status(200)
        .json({
          success: true,
          data: data,
          message: 'Retrieved all news entries'
        });
    })
    .catch(function (err) {
      res.status(404)
        .json({
          success: false,
          message: 'No news entries found'
        });
    });
}

module.exports = router;