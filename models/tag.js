module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      title: DataTypes.STRING
    },
    {
      underscored: true,
      tableName: 'tags'
    }
  );

  Tag.associate = function(models) {
    Tag.belongsToMany(models.Person, {
      through: 'people_tags',
      foreignKey: 'tag_id',
      as: 'person'
    });
  };

  return Tag;
};
