const express = require('express');
const statsRouter = express.Router();

const statsController = require('../controllers/stats.controller');

statsRouter.get('/averageAge', statsController.averageAge);
statsRouter.get('/nationalityCount', statsController.nationalityCount);
statsRouter.get('/homicideCount', statsController.homicideCount);
statsRouter.get('/homicidesPerTownship', statsController.homicidesPerTownship);
statsRouter.get('/homicidesPerCounty', statsController.homicidesPerCounty);
statsRouter.get(
  '/homicidesPerCountryPart',
  statsController.homicidesPerCountryPart
);

module.exports = statsRouter;
