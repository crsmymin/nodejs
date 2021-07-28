const express = require('express');
const router = express.Router();
const controller = require('./community.controller');

/* GET home page. */
router.get('/', controller.community);

module.exports = router;