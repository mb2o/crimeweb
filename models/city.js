module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    'City',
    {
      cityname: DataTypes.STRING,
      citycode: DataTypes.STRING,
      township: DataTypes.STRING,
      townshipcode: DataTypes.STRING,
      county: DataTypes.STRING,
      countycode: DataTypes.STRING,
      countrypart: DataTypes.STRING,
      countrypartcode: DataTypes.STRING
    },
    {}
  );

  City.associate = function(models) {
    // associations can be defined here
  };

  return City;
};
