const db = require('../../models');
const { Op } = db.Sequelize;

const peopleController = {};

peopleController.create = async (req, res) => {
  let person = await db.Person.create({ ...req.body });

  return res.status(201).json(person);
};

peopleController.find = async (req, res) => {
  let filter = {};
  let whereFilter = [];

  Object.keys(req.query).forEach(item => {
    if (item.endsWith('_id')) {
      whereFilter.push({
        [item]: {
          [Op.eq]: req.query[item]
        }
      });
    } else {
      whereFilter.push({
        [item]: {
          [Op.like]: `%${req.query[item]}%`
        }
      });
    }
  });

  if (Object.keys(req.query).length > 0) {
    filter = {
      where: {
        [Op.and]: whereFilter
      },
      order: [['deathdate', 'DESC']],
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
          attributes: ['id', 'name', 'iso_alpha_2']
        },
        {
          model: db.Country,
          as: 'deathcountry',
          attributes: ['id', 'name', 'iso_alpha_2']
        },
        {
          model: db.Crime,
          as: 'crimes',
          attributes: [
            'id',
            'remark',
            'is_solved',
            'type_id',
            'committeddate',
            'motive_id'
          ],
          include: [
            {
              model: db.Person,
              as: 'victim',
              attributes: [
                'id',
                'birthdate',
                'birthname',
                'deathdate',
                'firstname',
                'lastname',
                'gender',
                'nicknames',
                'photo',
                'remark',
                'is_deceased'
              ]
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
          attributes: [
            'id',
            'remark',
            'is_solved',
            'type_id',
            'committeddate',
            'motive_id'
          ],
          include: [
            {
              model: db.Person,
              as: 'perpetrator',
              attributes: [
                'id',
                'birthdate',
                'birthname',
                'deathdate',
                'firstname',
                'lastname',
                'gender',
                'nicknames',
                'photo',
                'remark',
                'is_deceased'
              ]
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
          model: db.Conviction,
          as: 'convictions',
          attributes: [
            'id',
            'duration',
            'tbs',
            'title',
            'verdictdate',
            'ecli',
            'ecli_appeal',
            'casenumber',
            'country_id'
          ],
          include: [
            {
              model: db.Country,
              as: 'country',
              attributes: ['id', 'name', 'iso_alpha_2']
            }
          ]
        },
        {
          model: db.Detail,
          as: 'details',
          attributes: ['id', 'title', 'description']
        },
        {
          model: db.Event,
          as: 'events',
          attributes: ['id', 'eventdate', 'description']
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
  }

  let people = await db.Person.findAll(filter);

  return res.status(200).json(people);
};

peopleController.findAll = async (req, res) => {
  let people = await db.Person.findAll({
    include: [
      {
        model: db.User,
        as: 'user',
        attributes: ['id', 'name']
      },
      {
        model: db.Country,
        as: 'birthcountry',
        attributes: ['name', 'iso_alpha_2']
      },
      {
        model: db.Country,
        as: 'deathcountry',
        attributes: ['name', 'iso_alpha_2']
      },
      {
        model: db.Crime,
        as: 'crimes',
        attributes: [
          'id',
          'remark',
          'is_solved',
          'type_id',
          'committeddate',
          'motive_id'
        ],
        include: [
          {
            model: db.Person,
            as: 'victim',
            attributes: [
              'id',
              'birthdate',
              'birthname',
              'deathdate',
              'firstname',
              'lastname',
              'gender',
              'nicknames',
              'photo',
              'remark',
              'is_deceased'
            ]
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
        attributes: [
          'id',
          'remark',
          'is_solved',
          'type_id',
          'committeddate',
          'motive_id'
        ],
        include: [
          {
            model: db.Person,
            as: 'perpetrator',
            attributes: [
              'id',
              'birthdate',
              'birthname',
              'deathdate',
              'firstname',
              'lastname',
              'gender',
              'nicknames',
              'photo',
              'remark',
              'is_deceased'
            ]
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
        model: db.Conviction,
        as: 'convictions',
        attributes: [
          'id',
          'duration',
          'tbs',
          'title',
          'verdictdate',
          'ecli',
          'ecli_appeal',
          'casenumber',
          'country_id'
        ],
        include: [
          {
            model: db.Country,
            as: 'country',
            attributes: ['id', 'name', 'iso_alpha_2']
          }
        ]
      },
      {
        model: db.Detail,
        as: 'details',
        attributes: ['id', 'title', 'description']
      },
      {
        model: db.Event,
        as: 'events',
        attributes: ['id', 'eventdate', 'description']
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
    ],
    order: [['deathdate', 'DESC']],
    limit: 15
  });

  return res.status(200).json(people);
};

peopleController.findById = async (req, res) => {
  let person = await db.Person.findByPk(req.params.id, {
    include: [
      {
        model: db.User,
        as: 'user',
        attributes: ['id', 'name']
      },
      {
        model: db.Country,
        as: 'birthcountry',
        attributes: ['id', 'name', 'iso_alpha_2']
      },
      {
        model: db.Country,
        as: 'deathcountry',
        attributes: ['id', 'name', 'iso_alpha_2']
      },
      {
        model: db.Crime,
        as: 'crimes',
        attributes: [
          'id',
          'remark',
          'is_solved',
          'type_id',
          'committeddate',
          'motive_id'
        ],
        include: [
          {
            model: db.Person,
            as: 'victim',
            attributes: [
              'id',
              'birthdate',
              'birthname',
              'deathdate',
              'firstname',
              'lastname',
              'gender',
              'nicknames',
              'photo',
              'remark',
              'is_deceased'
            ]
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
        attributes: [
          'id',
          'remark',
          'is_solved',
          'type_id',
          'committeddate',
          'motive_id'
        ],
        include: [
          {
            model: db.Person,
            as: 'perpetrator',
            attributes: [
              'id',
              'birthdate',
              'birthname',
              'deathdate',
              'firstname',
              'lastname',
              'gender',
              'nicknames',
              'photo',
              'remark',
              'is_deceased'
            ]
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
        model: db.Conviction,
        as: 'convictions',
        attributes: [
          'id',
          'duration',
          'tbs',
          'title',
          'verdictdate',
          'ecli',
          'ecli_appeal',
          'casenumber',
          'country_id'
        ],
        include: [
          {
            model: db.Country,
            as: 'country',
            attributes: ['id', 'name', 'iso_alpha_2']
          }
        ]
      },
      {
        model: db.Detail,
        as: 'details',
        attributes: ['id', 'title', 'description']
      },
      {
        model: db.Event,
        as: 'events',
        attributes: ['id', 'eventdate', 'description']
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
  });

  return res.status(200).json(person);
};

peopleController.update = async (req, res) => {
  await db.Person.update(
    { ...req.body },
    {
      where: {
        id: req.params.id
      }
    }
  );

  return res.status(200).send();
};

peopleController.delete = async (req, res) => {
  await db.Person.destroy({
    where: {
      id: req.params.id
    }
  });

  return res.status(200).send();
};

module.exports = peopleController;
