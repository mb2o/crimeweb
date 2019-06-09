const db = require('../../models');

const peopleController = {};

peopleController.create = (req, res) => {
  const { name, price, category } = req.body;

  db.Person.create({ name, price, category }).then(person => {
    res.status(201).json(person);
  });
};

peopleController.read = (req, res) => {
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
          }
        ]
      }
    ],
    order: [['deathdate', 'DESC']],
    limit: 30
  }).then(people => {
    res.json(people);
  });
};

peopleController.readOne = (req, res) => {
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
          }
        ]
      }
    ]
  }).then(item => {
    res.status(200).json(item);
  });
};

peopleController.update = (req, res) => {
  const { name, price, category } = req.body;

  db.Person.update(
    { name, price, category },
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
