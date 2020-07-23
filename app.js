const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const auth = require('./routes/auth-routes');
const products = require('./routes/product-routes');
const reports = require('./routes/report-routes');
const storeDetails = require('./routes/storeDetails-routes'); 
const connectDb = require("./connection/database"); 
 
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
//Allow all requests from all domains & localhost
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
  next();
});

app.use('/authentication', auth);
app.use('/product', products);
app.use('/report', reports); 
app.use(storeDetails);

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

app.use(helmet());
app.use(compression());
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

const port = process.env.PORT || 3040;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Ayolee api running");
    });
  })
  .catch(err => {
    console.log("Database connection failed");
  }); 