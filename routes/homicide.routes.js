const express = require('express');
const homicideRouter = express.Router();

const homicideController = require('../controllers/homicides.controller');

homicideRouter.get('/', homicideController.homicides);

homicideRouter.get('/homicidesPerCity', homicideController.homicidesPerCity);

homicideRouter.get(
  '/homicidesPerTownship',
  homicideController.homicidesPerTownship
);

homicideRouter.get(
  '/homicidesPerCounty',
  homicideController.homicidesPerCounty
);

homicideRouter.get(
  '/homicidesPerCountryPart',
  homicideController.homicidesPerCountryPart
);

module.exports = homicideRouter;
