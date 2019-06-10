module.exports = (sequelize, DataTypes) => {
  const Classification = sequelize.define(
    'Classification',
    {
      title: DataTypes.STRING
    },
    {
      underscored: true,
      tableName: 'classifications'
    }
  );

  Classification.associate = function(models) {
    Classification.hasMany(models.Person, {
      foreignKey: 'classification_id',
      as: 'classification'
    });
  };

  return Classification;
};
