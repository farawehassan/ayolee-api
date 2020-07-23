const Product = require('../model/product');
const Report = require('../model/daily-report');

// Fetch store details
exports.fetchDetails = async (req, res, next) => {
  let cpNetWorth = 0.00;
  let spNetWorth = 0.00;
  let totalItems = 0.00;
  let totalSalesMade = 0.00;
  let totalProfitMade = 0.00;
  try {
    const products = await Product.find();
    const reports = await Report.find();

    for (i = 0; i < products.length; i++) {
      cpNetWorth += parseFloat(products[i].costPrice) * parseFloat(products[i].currentQty);
      spNetWorth += parseFloat(products[i].sellingPrice) * parseFloat(products[i].currentQty);
      totalItems += parseFloat(products[i].currentQty);
    }
    for (i = 0; i < reports.length; i++) {
      totalSalesMade += parseFloat(reports[i].totalPrice);
      totalProfitMade += parseFloat(reports[i].quantity) * (parseFloat(reports[i].unitPrice) - parseFloat(reports[i].costPrice));
    }
    var storeDetails =  {
      cpNetWorth: cpNetWorth.toString(),
      spNetWorth: spNetWorth.toString(),
      totalItems: totalItems.toString(),
      totalSalesMade: totalSalesMade.toString(),
      totalProfitMade: totalProfitMade.toString(),
    }; 
    return res.status(200).send({ error: "false", message: "Store details successfully fetched", data: storeDetails }); 
  } catch (error) {
    console.log(err);
    return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });
  }

}  