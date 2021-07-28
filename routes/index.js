const express = require('express');
const router = express.Router();

const main = require('./main/');
const about = require('./about/');
const community = require('./community/');
const contact = require('./contact/');

router.use('/', main);
router.use('/about', about);
router.use('/community', community);
router.use('/contact', contact);

module.exports = router;