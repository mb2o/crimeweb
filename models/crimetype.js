module.exports = (sequelize, DataTypes) => {
  const CrimeType = sequelize.define(
    'CrimeType',
    {
      title: DataTypes.STRING
    },
    {
      underscored: true,
      tableName: 'crime_types'
    }
  );

  CrimeType.associate = function(models) {
    CrimeType.hasMany(models.Crime, {
      foreignKey: 'type_id',
      as: 'crime_type'
    });
  };

  return CrimeType;
};
