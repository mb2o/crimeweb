const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/auth.controller');
const verifySignUp = require('../helpers/auth/verifySignup');

authRouter.post(
  '/signup',
  [verifySignUp.checkDuplicateEmail],
  authController.signup
);
authRouter.post('/signin', authController.signin);

module.exports = authRouter;
