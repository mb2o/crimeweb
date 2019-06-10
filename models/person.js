const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define(
    'Person',
    {
      age: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      birthaddress: DataTypes.STRING,
      birthcity: DataTypes.STRING,
      birthcountry_id: DataTypes.INTEGER,
      birthdate: DataTypes.DATE,
      birthname: DataTypes.STRING,
      deathaddress: DataTypes.STRING,
      deathcity: DataTypes.STRING,
      deathcountry_id: DataTypes.STRING,
      deathdate: DataTypes.DATE,
      firstname: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      lastname: DataTypes.STRING,
      nicknames: DataTypes.STRING,
      photo: DataTypes.STRING,
      remark: DataTypes.STRING,
      mannerofdeath_id: DataTypes.STRING,
      causeofdeath_id: DataTypes.STRING,
      classification_id: DataTypes.STRING,
      is_deceased: DataTypes.BOOLEAN
    },
    {
      underscored: true
    }
  );

  Person.associate = function(models) {
    Person.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Person.belongsTo(models.Country, {
      foreignKey: 'birthcountry_id',
      as: 'birthcountry'
    });
    Person.belongsTo(models.Country, {
      foreignKey: 'deathcountry_id',
      as: 'deathcountry'
    });
    Person.belongsTo(models.CauseOfDeath, {
      foreignKey: 'causeofdeath_id',
      as: 'cause_of_death'
    });
    Person.belongsTo(models.MannerOfDeath, {
      foreignKey: 'mannerofdeath_id',
      as: 'manner_of_death'
    });
    Person.belongsTo(models.Classification, {
      foreignKey: 'classification_id',
      as: 'classification'
    });

    Person.hasMany(models.Crime, { foreignKey: 'criminal_id', as: 'crimes' });
    Person.hasMany(models.Crime, { foreignKey: 'victim_id', as: 'victim_of' });
    Person.hasMany(models.Conviction, {
      foreignKey: 'person_id',
      as: 'convictions'
    });
    Person.hasMany(models.Detail, {
      foreignKey: 'person_id',
      as: 'details'
    });
    Person.hasMany(models.Event, {
      foreignKey: 'person_id',
      as: 'events'
    });
  };

  return Person;
};
