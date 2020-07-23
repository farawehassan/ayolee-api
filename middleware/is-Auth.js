const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.send({status: 401, error: "true", message: "Not authenticated" });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret');
  } catch (error) {
    console.log(error);
    return res.send({status: 422, error: "true", message: "Invalid authorization header" });
  }
  if (!decodedToken) {
    return res.send({status: 401, error: "true", message: "Not authenticated" });
  }
  req.userId = decodedToken.userId;
  next();
};
