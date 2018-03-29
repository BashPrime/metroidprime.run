var express = require('express');
var Leaderboards = require('../models/leaderboard');
var router = express.Router();

var categoryRouter = express.Router({mergeParams: true});

// Initialize database object
var db = require('../queries');

// Define routes
// router.get('/', getLeaderboards);
router.get('/category/:categoryId', getLeaderboardsByCategory);

// Router functions
function getLeaderboards(req, res, next) {
  // Check required parameters first
  if (req.query.tagid || (req.query.game && req.query.tag)) {
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
  } else {
    const err = new Error('Required parameters not found. A game and tag name, or just the tag id must be supplied as query parameters.');
    return next(err);
  }
}

function getLeaderboardsByCategory(req, res, next) {
  Leaderboards.getLeaderboardsByCategory(req.params.categoryId, (err, leaderboards) => {
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
