const express = require('express');
const peopleRouter = express.Router();

const auth = require('../helpers/auth/verifyJwtToken');

const peopleController = require('../controllers/people.controller');

peopleRouter.post('/', [auth.verifyToken], peopleController.create);
peopleRouter.get('/', peopleController.read);
peopleRouter.get('/:id', peopleController.readOne);
peopleRouter.patch('/:id', [auth.verifyToken], peopleController.update);
peopleRouter.delete('/:id', [auth.verifyToken], peopleController.delete);

module.exports = peopleRouter;
