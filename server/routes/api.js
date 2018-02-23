var router = require('express').Router();

// Define node API routes here
router.use('/users', require('./users'));
router.use('/authenticate', require('./auth'));

module.exports = router;
