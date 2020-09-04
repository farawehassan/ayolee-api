const path = require('path');
const express = require('express');
const reportController = require('../controller/report-controller');
const isAuth = require('../middleware/is-Auth');
const router = express.Router();

// Fetch all reports from the database
router.get('/fetchAllReports', isAuth, reportController.fetchReports);
 
// Add new daily report to the database
router.post('/addNewReport', isAuth, reportController.addNewDailyReport);

// Update report product name 
router.put('/updateReportName', isAuth, reportController.updateDailyReportName);

// Delete a report from the database 
router.delete('/deleteReport/:id', isAuth, reportController.deleteDailyReport);

module.exports = router;
 