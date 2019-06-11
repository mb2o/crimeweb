const express = require('express');
const peopleRouter = express.Router();

const auth = require('../helpers/auth/verifyJwtToken');
const peopleController = require('../controllers/people.controller');

peopleRouter.post('/', [auth.verifyToken], peopleController.create);

peopleRouter.get('/search', peopleController.find);
peopleRouter.get('/', peopleController.findAll);
peopleRouter.get('/:id', peopleController.findById);
peopleRouter.get('/:id/relations', peopleController.getRelations);
peopleRouter.get('/:id/convictions', peopleController.getConvictions);

peopleRouter.patch('/:id', [auth.verifyToken], peopleController.update);

peopleRouter.delete('/:id', [auth.verifyToken], peopleController.delete);

module.exports = peopleRouter;
