var express = require('express');
var Leaderboards = require('../models/leaderboard');
var router = express.Router();

// Initialize database object
var db = require('../queries');

// Define routes
router.get('/', getLeaderboards);
router.get('/category', getLeaderboardsByCategory);

// Router functions
function getLeaderboards(req, res, next) {
  Leaderboards.getLeaderboards(req.query, (err, leaderboards) => {
    if (err) {
      return next(err);
    }
    return res.json({
      success: true,
      data: leaderboards,
      message: 'Retrieved ' + leaderboards.length + ' leaderboard entries'
    });
  });
}

function getLeaderboardsByCategory(req, res, next) {
  Leaderboards.getLeaderboardsBySubcategory(req.query, (err, leaderboards) => {
    if (err) {
      return next(err);
    }
    return res.json({
      success: true,
      data: leaderboards,
      message: 'Retrieved ' + leaderboards.length + ' leaderboard entries'
    });
  });
}

module.exports = router;
