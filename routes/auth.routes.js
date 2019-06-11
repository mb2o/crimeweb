const express = require('express');
const authRouter = express.Router();

const auth = require('../helpers/auth/verifyJwtToken');
const authController = require('../controllers/auth.controller');
const verifySignUp = require('../helpers/auth/verifySignup');

authRouter.get('/', [auth.verifyToken], authController.getUser);

authRouter.post(
  '/signup',
  [verifySignUp.checkDuplicateEmail],
  authController.signup
);

authRouter.post('/signin', authController.signin);

module.exports = authRouter;
