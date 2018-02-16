var router = require('express').Router();

// Define node API routes here
router.use('/users', require('./users'));

module.exports = router;
