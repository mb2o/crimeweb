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
    include: {
      model: db.User,
      as: 'user',
      attributes: ['id', 'name']
    },
    order: [['deathdate', 'DESC']],
    limit: 30
  }).then(people => {
    res.json(people);
  });
};

peopleController.readOne = (req, res) => {
  db.Person.findByPk(req.params.id, {
    include: {
      model: db.User,
      as: 'user',
      attributes: ['id', 'name']
    }
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
