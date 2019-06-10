module.exports = (sequelize, DataTypes) => {
  const Detail = sequelize.define(
    'Detail',
    {
      description: DataTypes.TEXT,
      person_id: DataTypes.INTEGER,
      title: DataTypes.STRING
    },
    {
      underscored: true,
      tableName: 'details'
    }
  );

  Detail.associate = function(models) {
    Detail.belongsTo(models.Person, {
      foreignKey: 'person_id',
      as: 'details'
    });
  };

  return Detail;
};
