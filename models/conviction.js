module.exports = (sequelize, DataTypes) => {
  const Conviction = sequelize.define(
    'Conviction',
    {
      duration: DataTypes.STRING,
      person_id: DataTypes.INTEGER,
      tbs: DataTypes.BOOLEAN,
      title: DataTypes.STRING,
      verdictdate: DataTypes.DATE,
      ecli: DataTypes.STRING,
      ecli_appeal: DataTypes.STRING,
      country_id: DataTypes.INTEGER,
      casenumber: DataTypes.STRING
    },
    {
      underscored: true,
      tableName: 'convictions'
    }
  );

  Conviction.associate = function(models) {
    Conviction.belongsTo(models.Person, {
      foreignKey: 'person_id',
      as: 'convict'
    });
    Conviction.belongsTo(models.Country, {
      foreignKey: 'country_id',
      as: 'country'
    });
  };

  return Conviction;
};
