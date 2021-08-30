const express = require('express');
const controller = require('../controller/server');
const router = express.Router();

router.get('/', controller.get);

module.exports = router;