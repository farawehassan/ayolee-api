const Product = require('../model/product');
const { validationResult } = require('express-validator'); 

// Add new available product
exports.addNewProduct = (req, res, next) => {
  const productName = req.body.productName;
  const costPrice = req.body.costPrice;
  const sellingPrice = req.body.sellingPrice;
  const initialQty = req.body.initialQty;
  const currentQty = req.body.currentQty;
  const createdAt = req.body.createdAt;

  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
    return res.status(422).send({ error: "true", message: errors.array()[0].msg });
  }

  const product = new Product({
    productName: productName,
    costPrice: costPrice,
    sellingPrice: sellingPrice,
    initialQty: initialQty,
    currentQty: currentQty,
    createdAt: createdAt,
    updatedAt: createdAt,
  });
  product.save()
    .then(savedProduct => {
      return res.status(200).send({ error: "false", message: `${productName} was successfully added` }); 
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: "Database operation failed, please try again" }); 
    });
}

// Fetch all available products
exports.fetchProducts = async (req, res, next) => {
  try {
    const products = await Product.find(); 
    return res.status(200).send({  error: "false", message: "Products successfully fetched", data: products });    
  } catch (error) {
    console.log(err);
    return res.status(500).send({ status: 500, error: "true", message: "Database operation failed, please try again" });    
  }

} 

// Fetch a particular product
exports.findProduct = (req, res, next) => {
  const prodId = req.params.id;  
  Product.findById(prodId)
    .then(product => {
      if(!product){
        return res.status(422).send({ error: "true", message: "Couldn't find the product with the id specified" });
      }  
      return res.status(200).send({ error: "false", message: "Product successfully fetched", data: product });  
  })
  .catch(err => {
    console.log(err);
    return res.status(500).send({ error: "true", message: `Unable to fetch product`});    
  }); 


}

// Modify product to change the name, cp, sp or 
// add another quantity if another quantity of the same product is added
exports.updateProduct = (req, res, next) => {
  const prodId = req.params.id;
  const updatedName = req.body.productName;
  const updatedCP = req.body.costPrice;
  const updatedSP = req.body.sellingPrice;
  const updatedIQ = req.body.initialQty;
  const updatedCQ = req.body.currentQty;
  const updatedAT = req.body.updatedAt;

  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
    return res.status(422).send({ status: 422, error: "true", message: errors.array()[0].msg });
  }

  Product.findById(prodId)
  .then(product => {
    if(!product){
      return res.status(422).send({ error: "true", message: "Couldn't find the product with the id specified" });
    }   
    Product.findByIdAndUpdate(prodId, {
      $set: {
        productName: updatedName,
        costPrice: updatedCP,
        sellingPrice: updatedSP,
        initialQty: updatedIQ,
        currentQty: updatedCQ,
        updatedAt: updatedAT
      }
    },
      function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).send({ error: "true", message: "Updating product failed." }); 
        } else { 
          return res.status(200).send({ error: "false", message: `Updated ${updatedName} successfully` }); 
        }
      }
    );
  
  })
  .catch(err => {
    console.log(err);
    return res.status(500).send({ error: "true", message: `Database operation failed, please try again`});    
  });  

} 

// Delete product
exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  const productName = req.body.productName;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.status(422).send({ error: "true", message: "Couldn't find the product with the id specified" });
      }
      if (product.productName !== productName) {
        return res.status(422).send({ error: "true", message: "Product name doesn't match with the product id" });
      }
      return Product.deleteOne({ _id: prodId });
    })
    .then(() => { 
      return res.status(200).send({ error: "false", message: `Deleted ${productName} successfully` });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: "Deleting product failed." });
    });
}