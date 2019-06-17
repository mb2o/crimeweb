const express = require('express');
const statsRouter = express.Router();

const statsController = require('../controllers/stats.controller');

statsRouter.get('/averageAge', statsController.averageAge);
statsRouter.get('/nationalityCount', statsController.nationalityCount);
statsRouter.get('/homicideCount', statsController.homicideCount);

module.exports = statsRouter;
