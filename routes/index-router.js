const express = require('express');
const router = express.Router();

const main = require('./main-router');
const about = require('./about-router');
const business = require('./business-router');
const board = require('./board-router');
const contact = require('./contact-router');
const users = require('./users-router');

router.use('/', main);
router.use('/about', about);
router.use('/business', business);
router.use('/board', board);
router.use('/contact', contact);
router.use('/', users);

module.exports = router;