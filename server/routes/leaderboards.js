var express = require('express');
var Leaderboards = require('../models/leaderboard');
var router = express.Router();

var categoryRouter = express.Router({mergeParams: true});

// Initialize database object
var db = require('../queries');

// Define routes
router.get('/category/:categoryId', getLeaderboardsByCategory);

// Router functions
function getLeaderboardsByCategory(req, res, next) {
  Leaderboards.getLeaderboardsByCategory(req.params.categoryId, req.query, (err, leaderboards) => {
    if (err) {
      return next(err);
    }
    return res.json({
      success: true,
      data: leaderboards,
    });
  });
}

module.exports = router;
