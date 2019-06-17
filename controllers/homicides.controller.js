const db = require('../models');

const homicidesController = {};

homicidesController.homicidesPerCity = async (req, res) => {
  let sql =
    'select cityname as city, count(*) as homicides from people p join cities c on lower(c.cityname) = lower(p.deathcity) where p.deathcountry_id = 156 and p.mannerofdeath_id = 38 group by cityname order by cityname';

  if (req.query.township) {
    sql = `select cityname as city, count(*) as homicides from people p join cities c on lower(c.cityname) = lower(p.deathcity) where p.deathcountry_id = 156 and p.mannerofdeath_id = 38 and c.township = '${
      req.query.township
    }' group by cityname order by cityname`;
  }

  db.sequelize
    .query(sql, { type: db.sequelize.QueryTypes.SELECT })
    .then(stats => {
      return res.status(200).json(stats);
    });
};

homicidesController.homicidesPerTownship = async (req, res) => {
  let sql =
    'select township, count(*) as homicides from people p join cities c on lower(c.cityname) = lower(p.deathcity) where p.deathcountry_id = 156 and mannerofdeath_id = 38 group by township order by township';

  if (req.query.county) {
    sql = `select township, count(*) as homicides from people p join cities c on lower(c.cityname) = lower(p.deathcity) where p.deathcountry_id = 156 and mannerofdeath_id = 38 and c.county = '${
      req.query.county
    }' group by township order by township`;
  }

  db.sequelize
    .query(sql, { type: db.sequelize.QueryTypes.SELECT })
    .then(stats => {
      return res.status(200).json(stats);
    });
};

homicidesController.homicidesPerCounty = async (req, res) => {
  db.sequelize
    .query(
      'select county, count(*) as homicides from people p join cities c on lower(c.cityname) = lower(p.deathcity) where p.deathcountry_id = 156 and mannerofdeath_id = 38 group by county order by county',
      { type: db.sequelize.QueryTypes.SELECT }
    )
    .then(stats => {
      return res.status(200).json(stats);
    });
};

homicidesController.homicidesPerCountryPart = async (req, res) => {
  db.sequelize
    .query(
      'select countrypart, count(*) as homicides from people p join cities c on lower(c.cityname) = lower(p.deathcity) where p.deathcountry_id = 156 and mannerofdeath_id = 38 group by countrypart order by countrypart',
      { type: db.sequelize.QueryTypes.SELECT }
    )
    .then(stats => {
      return res.status(200).json(stats);
    });
};

module.exports = homicidesController;
