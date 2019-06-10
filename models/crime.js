module.exports = (sequelize, DataTypes) => {
  const Crime = sequelize.define(
    'Crime',
    {
      criminal_id: DataTypes.INTEGER,
      remark: DataTypes.TEXT,
      is_solved: DataTypes.BOOLEAN,
      type_id: DataTypes.INTEGER,
      victim_id: DataTypes.INTEGER,
      committeddate: DataTypes.DATE,
      motive_id: DataTypes.INTEGER
    },
    {
      underscored: true
    }
  );

  Crime.associate = function(models) {
    Crime.belongsTo(models.Person, { foreignKey: 'victim_id', as: 'victim' });
    Crime.belongsTo(models.Person, {
      foreignKey: 'criminal_id',
      as: 'perpetrator'
    });
    Crime.belongsTo(models.CrimeType, {
      foreignKey: 'type_id',
      as: 'crime_type'
    });
    Crime.belongsTo(models.Motive, {
      foreignKey: 'motive_id',
      as: 'motive'
    });
  };

  return Crime;
};
