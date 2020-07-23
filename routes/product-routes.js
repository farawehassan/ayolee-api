const express = require('express');
const { body } = require('express-validator'); 
const productController = require('../controller/product-controller');
const isAuth = require('../middleware/is-Auth');
const router = express.Router();

// Fetch all available products from the database
router.get('/fetchAllProducts', isAuth, productController.fetchProducts);

// Fetch a particular product from the database
router.get('/fetchProduct/:id', isAuth, productController.findProduct);

// Add new product to the database
router.post('/addProduct', isAuth, [
  body('costPrice').trim().custom((value, {req}) => {
    if(parseFloat(value) > parseFloat(req.body.sellingPrice)){
      throw new Error('Cost price cannot be greater than selling price');
    }
    return true;
  }), 
  body('sellingPrice').trim().custom((value, {req}) => {
    if(parseFloat(value) < parseFloat(req.body.costPrice)){
      throw new Error('Selling price cannot be lesser than the cost price');
    }
    return true;
  }), 
  body('initialQty').trim().custom((value, {req}) => {
    if(parseFloat(value) < parseFloat(req.body.currentQty)){
      throw new Error('Initial quantity cannot be lesser than current quantity');
    }
    return true;
  }), 
  body('currentQty').trim().custom((value, {req}) => {
    if(parseFloat(value) > parseFloat(req.body.initialQty)){
      throw new Error('Current quantity cannot be greater than the initial quantity');
    }
    return true;
  }), 
],  
  productController.addNewProduct
);

// Update a product's details in the database
router.put('/editProduct/:id', isAuth, [
  body('costPrice').trim().custom((value, {req}) => {
    if(parseFloat(value) > parseFloat(req.body.sellingPrice)){
      throw new Error('Cost price cannot be greater than selling price');
    }
    return true;
  }), 
  body('sellingPrice').trim().custom((value, {req}) => {
    if(parseFloat(value) < parseFloat(req.body.costPrice)){
      throw new Error('Selling price cannot be lesser than the cost price');
    }
    return true;
  }), 
  body('initialQty').trim().custom((value, {req}) => {
    if(parseFloat(value) < parseFloat(req.body.currentQty)){
      throw new Error('Initial quantity cannot be lesser than current quantity');
    }
    return true;
  }), 
  body('currentQty').trim().custom((value, {req}) => {
    if(parseFloat(value) > parseFloat(req.body.initialQty)){
      throw new Error('Current quantity cannot be greater than the initial quantity');
    }
    return true;
  }), 
],
  productController.updateProduct
); 

// Delete a product from the database 
router.delete('/deleteProduct', isAuth, productController.deleteProduct);

module.exports = router;
