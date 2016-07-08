'use strict';
var router = require('express').Router();
module.exports = router;

// router.use('/members', require('./members'));
router.use('/users', require('./users'));
router.use('/applications', require('./applications'));
router.use('/bugs', require('./bugs'));
router.use('/github', require('./github'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
