var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var utilities = require('../utilities');
var News = require('../models/news');
var router = express.Router();

// Initialize database object
var db = require('../queries');

// Define routes
router.get('/', getNews);

// Router functions
function getNews(req, res, next) {
  News.getNews(req.query, (err, news) => {
    if (err) {
      return next(err);
    }
    return res.json({
      success: true,
      data: news,
      message: 'Retrieved ' + news.length + ' news entries'
    });
  });
}

module.exports = router;
