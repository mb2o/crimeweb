const db = require('../models');

const statsController = {};

statsController.averageAge = async (req, res) => {
  db.sequelize
    .query(
      'select round(avg(age), 1) as count from people where mannerofdeath_id = 38',
      {
        type: db.sequelize.QueryTypes.SELECT
      }
    )
    .then(count => {
      return res.status(200).json(count);
    });
};

statsController.nationalityCount = async (req, res) => {
  db.sequelize
    .query(
      'select distinct deathcountry_id as count from people where mannerofdeath_id = 38',
      {
        type: db.sequelize.QueryTypes.SELECT
      }
    )
    .then(count => {
      return res.status(200).json([
        {
          count: count.length
        }
      ]);
    });
};

statsController.homicideCount = async (req, res) => {
  db.sequelize
    .query('select count(*) as count from people where mannerofdeath_id = 38', {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(count => {
      return res.status(200).json(count);
    });
};

module.exports = statsController;
