const express = require('express');
const router = express.Router();
const controller = require('../controller/board.controller');

/* GET home page. */
router.get('/', controller.index);
router.get('/write', controller.write);
router.get('/edit/:id', controller.edit);
router.get('/view/:id', controller.view);
router.post('/create', controller.create);
router.post('/update', controller.update);
router.post('/delete', controller.delete);

module.exports = router;