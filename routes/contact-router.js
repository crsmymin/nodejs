const express = require('express');
const router = express.Router();
const controller = require('../controller/contact.controller');

/* GET contact page. */
router.get('/', controller.contact);
/* POST contact mail. */
router.post('/sendmail', controller.sendmail);

module.exports = router;