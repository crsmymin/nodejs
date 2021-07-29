const express = require('express');
const router = express.Router();
const controller = require('../controller/contact.controller');

/* GET home page. */
router.get('/', controller.contact);

module.exports = router;