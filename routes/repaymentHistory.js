const express = require('express')
const controller = require('../controllers/repaymentHistory')
const isAuth = require('../middleware/auth')
const router = express.Router()

// Fetch repayment history
router.get('/fetch/:customer/:reportId', isAuth, controller.fetchRepaymentHistory)

module.exports = router