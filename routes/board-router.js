const express = require('express');
const router = express.Router();
const controller = require('../controller/board.controller');

/* GET board page. */
router.get('/', controller.index);
/* GET board write page. */
router.get('/write', controller.write);
/* GET board edit page. */
router.get('/edit/:id', controller.edit);
/* GET board view page. */
router.get('/view/:id', controller.view);
/* POST board create. */
router.post('/create', controller.create);
/* POST board update. */
router.post('/update', controller.update);
/* POST board delete. */
router.post('/delete', controller.delete);

module.exports = router;