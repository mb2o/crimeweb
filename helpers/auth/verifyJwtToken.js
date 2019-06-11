const jwt = require('jsonwebtoken');

const env = require('../../config/env.js');

const auth = {};

auth.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({
      auth: false,
      result: 'failure',
      reason: 'No token was provided'
    });
  }

  jwt.verify(token, env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        auth: false,
        result: 'failure',
        reason: err
      });
    }

    req.user = decoded.user;

    next();
  });
};

module.exports = auth;
