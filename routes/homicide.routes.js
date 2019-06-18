const express = require('express');
const homicideRouter = express.Router();

const homicideController = require('../controllers/homicides.controller');

homicideRouter.get('/', homicideController.homicides);

homicideRouter.get(
  '/homicidesPerNationality',
  homicideController.homicidesPerNationality
);

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

homicideRouter.get('/homicidesBetween', homicideController.homicidesBetween);

homicideRouter.get('/:year', homicideController.homicides);
homicideRouter.get('/:year/:month', homicideController.homicides);
homicideRouter.get('/:year/:month/:day', homicideController.homicides);

module.exports = homicideRouter;
