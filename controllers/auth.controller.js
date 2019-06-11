const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');
const env = require('../config/env');

const authController = {};

authController.signup = (req, res) => {
  db.User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user =>
      res.status(201).json({
        result: 'success',
        data: user
      })
    )
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        err.errors = err.errors.map(error => {
          return {
            field: error.path,
            message: error.message
          };
        });
      }

      res.status(500).json({
        result: 'failure',
        reason: err
      });
    });
};

authController.signin = (req, res) => {
  db.User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          auth: false,
          result: 'failure',
          reason: 'Email not found'
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).json({
          auth: false,
          result: 'failure',
          reason: 'Invalid password'
        });
      }

      var token = jwt.sign({ id: user.id }, env.SECRET, {
        expiresIn: env.EXPIRES_IN // expires in 24 hours
      });

      res.status(200).json({
        auth: true,
        accessToken: token,
        result: 'success'
      });
    })
    .catch(err => {
      res.status(500).json({
        auth: false,
        result: 'failure',
        reason: err
      });
    });
};

module.exports = authController;
