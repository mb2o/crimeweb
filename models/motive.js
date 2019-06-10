module.exports = (sequelize, DataTypes) => {
  const Motive = sequelize.define(
    'Motive',
    {
      title: DataTypes.STRING
    },
    {
      underscored: true
    }
  );

  Motive.associate = function(models) {
    Motive.hasMany(models.Crime, {
      foreignKey: 'motive_id',
      as: 'motive'
    });
  };

  return Motive;
};
