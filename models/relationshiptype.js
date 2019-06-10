module.exports = (sequelize, DataTypes) => {
  const RelationshipType = sequelize.define(
    'RelationshipType',
    {
      title: DataTypes.STRING,
      is_bidirectional: DataTypes.BOOLEAN
    },
    {
      underscored: true,
      tableName: 'relationship_types'
    }
  );

  RelationshipType.associate = function(models) {
    RelationshipType.hasMany(models.Relationship, {
      foreignKey: 'relationshiptype_id',
      as: 'relationship_type'
    });
  };

  return RelationshipType;
};
