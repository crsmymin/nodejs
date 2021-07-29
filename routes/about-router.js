const express = require('express');
const router = express.Router();
const controller = require('../controller/about.controller');

/* GET home page. */
router.get('/', controller.about);

module.exports = router;