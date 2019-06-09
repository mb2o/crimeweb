const db = require('../../../models');

const signUpVerify = {};

signUpVerify.checkDuplicateEmail = (req, res, next) => {
  db.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).json({
        result: 'failure',
        reason: 'Email is already in use'
      });
      
      return;
    }

    next();
  });
};

module.exports = signUpVerify;
