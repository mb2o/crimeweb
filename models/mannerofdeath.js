'use strict';
module.exports = (sequelize, DataTypes) => {
  const MannerOfDeath = sequelize.define(
    'MannerOfDeath',
    {
      title: DataTypes.STRING
    },
    {
      underscored: true,
      tableName: 'manner_of_deaths'
    }
  );

  MannerOfDeath.associate = function(models) {
    MannerOfDeath.hasMany(models.Person, {
      foreignKey: 'mannerofdeath_id',
      as: 'manner_of_death'
    });
  };

  return MannerOfDeath;
};
