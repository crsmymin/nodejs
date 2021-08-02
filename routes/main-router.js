const express = require('express');
const router = express.Router();
const controller = require('../controller/main.controller');

/* GET home page. */
router.get('/', controller.index);
router.post('/post', controller.post);
router.get('/post/view/:id', controller.view);

module.exports = router;