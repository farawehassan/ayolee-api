const mongoose = require('mongoose');  

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWPORD}@taiwocluster0.yhpyt.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
const connectDB = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true, 
    useFindAndModify: false,
    useUnifiedTopology: true
  })
    .then(() => { 
      console.log('DB connection successful!');
    })
    .catch(err => { 
      console.log(err);
    }); 
};

module.exports = connectDB;    