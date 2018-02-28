var express = require('express');
var config = require('../../config');
var router = express.Router();

// Initialize database object
var db = require('../queries');

// Define routes
router.get('/', getNews);

// Router functions
function getNews(req, res, next) {
  var sql = 'select news.*, users.name as author from news left outer join users on (news.authorid = users.id)';
  if (req.query.count) {
    sql += ' limit ' + parseInt(req.query.count);
  }
  db.any(sql)
    .then(function (data) {
      res.status(200)
        .json({
          success: true,
          data: data,
          message: 'Retrieved ' + data.length + ' news entries'
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