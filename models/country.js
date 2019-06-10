module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define(
    'Country',
    {
      name: DataTypes.STRING,
      iso_alpha_2: DataTypes.STRING,
      iso_alpha_3: DataTypes.STRING,
      iso_un_m49: DataTypes.STRING
    },
    {
      underscored: true
    }
  );

  Country.associate = function(models) {
    Country.hasMany(models.Person, { foreignKey: 'birthcountry_id' });
    Country.hasMany(models.Person, { foreignKey: 'deathcountry_id' });
    Country.hasMany(models.Conviction, { foreignKey: 'country_id' });
  };

  return Country;
};
