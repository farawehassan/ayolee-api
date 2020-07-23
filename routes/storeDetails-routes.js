const express = require('express');
const storeDetailsController = require('../controller/storeDetails-controller');
const isAuth = require('../middleware/is-Auth');
const router = express.Router();

// Fetch the store details from the server
router.get('/fetchStoreDetails', isAuth, storeDetailsController.fetchDetails);

module.exports = router;