const ProductHistory = require('../model/product-history');

// Add new product history to database
exports.addProductHistory = (req, res, next) => {
  const productName = req.body.productName;
  const initialQty = req.body.initialQty;
  const qtyReceived = req.body.qtyReceived;
  const currentQty = req.body.currentQty;
  const collectedAt = req.body.collectedAt; 
  const createdAt = req.body.createdAt;

  const productHistory = {  
    initialQty: initialQty,
    qtyReceived: qtyReceived,
    currentQty: currentQty,
    collectedAt: collectedAt, 
  };  

  const newProductHistory = [productHistory];

  const product = new ProductHistory({  
    productName: productName,
    products: newProductHistory, 
    createdAt: createdAt,
  }); 

  product.save()
  .then( savedProduct => { 
    return res.status(200).send({ error: "false", message: `${productName} was saved to history successfully` });
  })
  .catch(err => {
    return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });
  });
}

// Fetch all product history
exports.fetchProductHistory = async (req, res, next) => {
  try {
    const products = await ProductHistory.find();
    return res.status(200).send({ error: "false", message: "Product history successfully fetched", data: products });
  } catch (error) {
    console.log(err);
    return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });
  }

}

// Fetch a particular product history
exports.findProductHistory = (req, res, next) => {
  const productHistoryId = req.params.id;
  ProductHistory.findById(productHistoryId)
    .then(product => {
      if (!product) {
        return res.status(422).send({ error: "true", message: "Couldn't find the product history with the id specified" });
      }
      return res.status(200).send({ error: "false", message: "Product history successfully fetched", data: product });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: "Unable to fetch product history" });
    });
}

// Add new history to product history
exports.addNewProductToHistory = (req, res, next) => {
  const productHistoryId = req.body.id;  
  const initialQty = req.body.initialQty;
  const qtyReceived = req.body.qtyReceived;
  const currentQty = req.body.currentQty;
  const collectedAt = req.body.collectedAt;  

  const productHistory = {  
    initialQty: initialQty,
    qtyReceived: qtyReceived,
    currentQty: currentQty,
    collectedAt: collectedAt, 
  };  
  
  const newHistory = [productHistory];

  ProductHistory.findById(productHistoryId)
    .then(product => {
      if (!product) {
        return res.status(422).send({ error: "true", message: "Couldn't find the product with the id specified" });
      } 
      ProductHistory.findByIdAndUpdate(productHistoryId, { $push: { products: newHistory } },
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send({ error: "true", message: "Adding history to product failed." });
          } else {
            return res.status(200).send({ error: "false", message: `History updated successfully` });
          }
        }
      ); 
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: `Unable to fetch product` });
    }); 
}

exports.updateProductName = (req, res, next) => {
  const productHistoryId = req.body.id;  
  const productName = req.body.name;

  ProductHistory.findById(productHistoryId)
    .then(product => {
      if (!product) {
        return res.status(422).send({ error: "true", message: "Couldn't find the product with the id specified" });
      }
      ProductHistory.findByIdAndUpdate(productHistoryId, { $set: { productName: productName } },
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send({ error: "true", message: "Updating product history failed." }); 
          } else { 
            return res.status(200).send({ error: "false", message: `Updated to ${productName} successfully` }); 
          }
        }
      );
    }).catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: `Unable to update product name` });
    });   
}

// Delete a product history
exports.deleteHistory = (req, res, next) => {
  const productHistoryId = req.params.id;  

  ProductHistory.findById(productHistoryId)
    .then(product => {
      if (!product) {
        return res.status(422).send({ error: "true", message: "Couldn't find the product history with the id specified" });
      }
      return ProductHistory.deleteOne({ _id: productHistoryId });
    })
    .then(() => { 
      return res.status(200).send({ error: "false", message: `Deleted product history successfully` });
    })
    .catch(err => { 
      console.log(err);
      return res.status(500).send({ error: "true", message: "Deleting product history failed." });
    }); 
} 