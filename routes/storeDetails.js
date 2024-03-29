const express = require('express')
const storeDetailsController = require('../controllers/storeDetails')
const isAuth = require('../middleware/auth')
const router = express.Router()

// Fetch the store details from the server
router.get('/fetchDetails', isAuth, storeDetailsController.fetchDetails)

// Fetch the store details from the server
router.get('/fetchDetailsChart', isAuth, storeDetailsController.fetchDetailsChart)

module.exports = router;