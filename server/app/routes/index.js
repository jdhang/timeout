'use strict';

const router = require('express').Router();

router.use('/posts', require('./posts'));
router.use('/events', require('./events'));
router.use('/projects', require('./projects'))

module.exports = router;
