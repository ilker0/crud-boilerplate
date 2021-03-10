const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');
const httpStatusCodes = require('../../utils/httpStatusCodes');

module.exports = (req, res, next) => {
  const token = req.headers['user_token'];

  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: httpStatusCodes[401] });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: httpStatusCodes[401] });
  }
};
