const db = require('../../models');
const { Op } = db.Sequelize;

const peopleController = {};

peopleController.create = (req, res) => {
  db.Person.create({ ...req.body }).then(person => {
    res.status(201).json(person);
  });
};

peopleController.find = (req, res) => {
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
        }
      ]
    };
  }

  db.Person.findAll(filter).then(people => {
    res.status(200).json(people);
  });
};

peopleController.findAll = (req, res) => {
  db.Person.findAll({
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
      }
    ],
    order: [['deathdate', 'DESC']],
    limit: 30
  }).then(people => {
    res.json(people);
  });
};

peopleController.findById = (req, res) => {
  db.Person.findByPk(req.params.id, {
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
      }
    ]
  }).then(person => {
    res.status(200).json(person);
  });
};

peopleController.update = (req, res) => {
  db.Person.update(
    { ...req.body },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(() => {
    res.status(200).send();
  });
};

peopleController.delete = (req, res) => {
  db.Person.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).send();
  });
};

module.exports = peopleController;
