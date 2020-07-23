const User = require('../model/user');
const { validationResult } = require('express-validator'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 
exports.postLogin = (req, res, next) => {
  const phone = req.body.phone; 
  const password = req.body.password;
  let loadedUser;
  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
    return res.status(422).send({ error: "true", message: errors.array()[0].msg });
  }

  User.findOne({phone: phone})
  .then(user =>{
    if(!user){
      return res.status(401).send({ error: "true", message: "User does not exist" });
    } 
    loadedUser = user;
    bcrypt.compare(password, user.password)
    .then(result => {
      if(result){
        const token = jwt.sign(
          {
            phone: loadedUser.phone,
            userId: loadedUser._id.toString(),
          },
          'secret' 
        ); 
        var details =  {
          id: loadedUser._id.toString(),
          name: loadedUser.name,
          phone: loadedUser.phone,
          type: loadedUser.type,
          createdAt: loadedUser.createdAt,
          token: token,
        }; 
        return res.status(200).send({ error: "false", message: "User logged in successfully", data: details }); 
      } else if(!result){ 
        return res.status(401).send({ error: "true", message: "Incorrect password" });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });    
    });
  }) 
  .catch(err => {
    console.log(err);
    return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });    
  });
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const type = req.body.type;
  const password = req.body.password; 

  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
    return res.status(422).send({ error: "true", message: errors.array()[0].msg });
  }

  User.findOne({phone: phone})
  .then(userDoc =>{
    if(userDoc){
      return res.status(404).send({ error: "true", message: "User already exist, please pick a different number" });
    } 
    return bcrypt.hash(password, 12)
    .then(hashedPassword => { 
      const user = new User({
        name: name,
        phone: phone,
        password: hashedPassword,
        type: type 
      });
      return user.save();
    })
    .then(result => { 
      return res.status(200).send({ error: "false", message: "User created successfully" }); 
    });
  }) 
  .catch(err => {
    console.log(err);
    return res.status(500).send({ error: "true", message: "Database operation failed, please try again"});    
  });
};
