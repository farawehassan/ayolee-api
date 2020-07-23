const express = require('express'); 
const { body } = require('express-validator'); 
const authController = require('../controller/auth-controller');

const router = express.Router();

router.post('/login',  [  
  body('password', 'Please enter a 4 digit valid pin')
    .isNumeric()
    .trim()
    .isLength(4),
  ],  
  authController.postLogin
);

router.post('/signup', [ 
  // password must be 4 digit long
  body(
    'password',
    'Please enter a 4 digit valid pin'
    )
    .isNumeric()
    .trim()
    .isLength(4),
  // confirmPassword must be the same with password
  body('confirmPassword').trim().custom((value, {req}) => {
    if(value !== req.body.password){
      throw new Error('Pin mismatch');
    }
    return true;
  }), 
],
  authController.postSignup
);

module.exports = router;