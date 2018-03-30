var express = require('express');
var Record = require('../models/record');
var router = express.Router();

router.get('/latest', getLatestRecords);

function getLatestRecords(req, res, next) {
  Record.getLatestRecords((err, records) => {
    if (err) {
      return next(err);
    }
    return res.json({
      success: true,
      data: records
    });
  });
}

module.exports = router;