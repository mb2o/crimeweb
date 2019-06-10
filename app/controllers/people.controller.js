const db = require('../../models');
const { Op } = db.Sequelize;

const peopleController = {};

peopleController.create = async (req, res) => {
  let result = await db.Person.create({ ...req.body });

  return res.status(201).json(result);
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

  let result = await db.Person.findAll(filter);

  return res.status(200).json(result);
};

peopleController.findAll = async (req, res) => {
  let result = await db.Person.findAll({
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

  return res.status(200).json(result);
};

peopleController.findById = async (req, res) => {
  let result = await db.Person.findByPk(req.params.id, {
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

  if (!result) {
    return res.status(404).json();
  }

  return res.status(200).json(result);
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
  return db.sequelize
    .transaction(t => {
      return db.Person.findByPk(req.params.id, { transaction: t }).then(
        person => {
          return db.Crime.destroy(
            { where: { criminal_id: person.dataValues.id } },
            { transaction: t }
          )
            .then(() => {
              return db.Crime.destroy(
                { where: { victim_id: person.dataValues.id } },
                { transaction: t }
              );
            })
            .then(() => {
              return db.Event.destroy(
                { where: { person_id: person.dataValues.id } },
                { transaction: t }
              );
            })
            .then(() => {
              return db.Detail.destroy(
                { where: { person_id: person.dataValues.id } },
                { transaction: t }
              );
            })
            .then(() => {
              return db.Conviction.destroy(
                { where: { person_id: person.dataValues.id } },
                { transaction: t }
              );
            })
            .then(() => {
              console.log(Object.keys(person.__proto__));

              return person.getTags().then(
                tags => {
                  const tagList = tags.map(item => item.dataValues.id);
                  return person.removeTags(tagList);
                },
                { transaction: t }
              );
            })
            .then(
              () => {
                return person.destroy();
              },
              { transaction: t }
            );
        }
      );
    })
    .then(() => {
      return res.status(200).send();
    });
};

module.exports = peopleController;
