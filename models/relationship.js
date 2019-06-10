module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define(
    'Relationship',
    {
      person1_id: DataTypes.INTEGER,
      person2_id: DataTypes.INTEGER,
      relationshiptype_id: DataTypes.INTEGER
    },
    {
      underscored: true,
      tableName: 'relationships'
    }
  );

  Relationship.associate = function(models) {
    Relationship.belongsTo(models.Person, {
      foreignKey: 'person2_id',
      as: 'relation'
    });
  };

  return Relationship;
};
