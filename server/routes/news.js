var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var utilities = require('../utilities');
var router = express.Router();

// Initialize database object
var db = require('../queries');

// Define routes
router.get('/', getNews);

// Router functions
function getNews(req, res, next) {
  var sql = 'select * from news';
  const obj = {
    where: {
      id: req.query.id,
      slug: req.query.slug
    }
  }

  var where = utilities.buildWhereClause(obj.where, 'or', 'where');

  if (where) {
    sql += where;
  }
  
  db.any(sql, obj)
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