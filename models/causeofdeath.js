module.exports = (sequelize, DataTypes) => {
  const CauseOfDeath = sequelize.define(
    'CauseOfDeath',
    {
      title: DataTypes.STRING
    },
    {
      underscored: true,
      tableName: 'cause_of_deaths'
    }
  );

  CauseOfDeath.associate = function(models) {
    CauseOfDeath.hasMany(models.Person, {
      foreignKey: 'causeofdeath_id',
      as: 'cause_of_death'
    });
  };

  return CauseOfDeath;
};
