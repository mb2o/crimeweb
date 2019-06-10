module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      description: DataTypes.TEXT,
      eventdate: DataTypes.DATE
    },
    {
      underscored: true,
      tableName: 'events'
    }
  );

  Event.associate = function(models) {
    Event.belongsTo(models.Person, {
      foreignKey: 'person_id',
      as: 'events'
    });
  };

  return Event;
};
