const db = require('../models');
const { Op } = db.Sequelize;
const {
  personAttributes,
  countryAttributes,
  crimeAttributes
} = require('../helpers/attributes');

const homicidesController = {};

homicidesController.homicides = async (req, res) => {
  let whereFilter = [
    {
      mannerofdeath_id: {
        [Op.eq]: 38
      }
    }
  ];

  if (req.query.city) {
    whereFilter.push({
      deathcity: {
        [Op.eq]: `${req.query.city}`
      }
    });
  }

  let filter = {
    where: {
      [Op.and]: whereFilter
    },
    order: [['lastname', 'ASC'], ['firstname', 'ASC']],
    limit: 30,
    include: [
      {
        model: db.User,
        as: 'user',
        attributes: ['id', 'name']
      },
      {
        model: db.Country,
        as: 'birthcountry',
        attributes: countryAttributes
      },
      {
        model: db.Country,
        as: 'deathcountry',
        attributes: countryAttributes
      },
      {
        model: db.Crime,
        as: 'crimes',
        attributes: crimeAttributes,
        include: [
          {
            model: db.Person,
            as: 'victim',
            attributes: personAttributes
          },
          {
            model: db.CrimeType,
            as: 'crime_type',
            attributes: ['title']
          },
          {
            model: db.Motive,
            as: 'motive',
            attributes: ['title']
          }
        ]
      },
      {
        model: db.Crime,
        as: 'victim_of',
        attributes: crimeAttributes,
        include: [
          {
            model: db.Person,
            as: 'perpetrator',
            attributes: personAttributes
          },
          {
            model: db.CrimeType,
            as: 'crime_type',
            attributes: ['title']
          },
          {
            model: db.Motive,
            as: 'motive',
            attributes: ['title']
          }
        ]
      },
      {
        model: db.CauseOfDeath,
        as: 'cause_of_death',
        attributes: ['title']
      },
      {
        model: db.Classification,
        as: 'classification',
        attributes: ['title']
      },
      {
        model: db.MannerOfDeath,
        as: 'manner_of_death',
        attributes: ['title']
      },
      {
        model: db.Tag,
        as: 'tags',
        attributes: ['id', 'title'],
        through: {
          attributes: []
        }
      }
    ]
  };

  let result = await db.Person.findAll(filter);

  return res.status(200).json(result);
};

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
