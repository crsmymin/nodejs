const express = require('express');
const router = express.Router();

const main = require('./main-router');
const about = require('./about-router');
const community = require('./community-router');
const contact = require('./contact-router');

router.use('/', main);
router.use('/about', about);
router.use('/community', community);
router.use('/contact', contact);

module.exports = router;