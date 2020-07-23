const Report = require('../model/daily-report');
const Product = require('../model/product');

// Fetch all reports
exports.fetchReports = async (req, res, next) => {
  try {
    const reports = await Report.find();
    return res.status(200).send({ error: "false", message: "Reports successfully fetched", data: reports });
  } catch (error) {
    console.log(err);
    return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });
  }
}

// Add new daily reports and update product's current quantity when an item is sold
exports.addNewDailyReport = (req, res, next) => {
  const quantity = req.body.quantity;
  const productName = req.body.productName;
  const costPrice = req.body.costPrice;
  const unitPrice = req.body.unitPrice;
  const totalPrice = req.body.totalPrice;
  const paymentMode = req.body.paymentMode;
  const createdAt = req.body.createdAt;
  const report = new Report({
    quantity: quantity,
    productName: productName,
    costPrice: costPrice,
    unitPrice: unitPrice,
    totalPrice: totalPrice,
    paymentMode: paymentMode,
    createdAt: createdAt
  });
  report.save()
    .then(savedReport => { 
      Product.find({ productName: productName })
        .then(product => {
          if (!product) {
            Report.findByIdAndDelete(savedReport._id)
              .then(() => {
                return res.status(401).send({ error: "true", message: "Saving product failed." });
              })
            return res.status(401).send({ error: "true", message: "Saving product failed." });
          } 
          Product.findByIdAndUpdate({ _id: product[0]._id }, { currentQty: (product[0].currentQty - parseFloat(quantity)) },
            function (err, result) {
              if (err) {
                console.log(err);
                Report.findByIdAndDelete(savedReport._id)
                  .then(() => {
                    return res.status(401).send({ error: "true", message: "Saving product failed." });
                  })
                return res.status(500).send({ error: "true", message: "Saving product failed." });
              } else {
                return res.status(200).send({ error: "false", message: `${productName} was saved successfully` });
              }
            }
          );
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send({ error: "true", message: `Database operation failed, please try again` });
        });
    })
    .catch(err => {
      return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });
    });
}

// Delete daily report product and update product's current quantity
exports.deleteDailyReport = (req, res, next) => {
  const id = req.params.id;

  Report.findById(id)
    .then(report => {
      if(!report){
        return res.status(422).send({ error: "true", message: "Couldn't find the report with the id specified" });
      } 
      Product.find({ productName: report.productName })
        .then(product => {
          if (!product) { 
            return res.status(401).send({ error: "true", message: "Deleting report failed." });
          } 
          Product.findByIdAndUpdate({ _id: product[0]._id }, { currentQty: (product[0].currentQty + report.quantity) },
            function (err, result) {
              if (err) {
                console.log(err); 
                return res.status(500).send({ error: "true", message: "Deleted report failed." });
              } else {
                Report.findByIdAndDelete(id)
                .then(savedReport => { 
                  return res.status(200).send({ error: "false", message: `Deleted successfully` });
                })
                .catch(err => {
                  return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });
                }); 
              }
            }
          );
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send({ error: "true", message: `Database operation failed, please try again` });
        });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: `Unable to delete report`});    
    });  
 
}