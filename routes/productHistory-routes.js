const express = require('express');
const productHistoryController = require('../controller/productHistory-controller');
const isAuth = require('../middleware/is-Auth');
const router = express.Router();

// Fetch all product history from the database
router.get('/fetchProductHistory', isAuth, productHistoryController.fetchProductHistory);

// Fetch a particular product history from the database
router.get('/findProductHistory/:id', isAuth, productHistoryController.findProductHistory);

// Add new product history to the database
router.post('/addProductHistory', isAuth, productHistoryController.addProductHistory);

// Add new history to product history to the database
router.post('/addNewProductToHistory', isAuth, productHistoryController.addNewProductToHistory); 

// Uodate product history name in the database
router.put('/updateProductName', isAuth, productHistoryController.updateProductName); 
 
// Delete a product history 
router.delete('/deleteHistory/:id', isAuth, productHistoryController.deleteHistory); 
 
module.exports = router;