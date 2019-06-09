module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define(
    'Person',
    {
      age: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      birthaddress: DataTypes.STRING,
      birthcity: DataTypes.STRING,
      birthcountry_id: DataTypes.INTEGER,
      birthdate: DataTypes.DATE,
      birthname: DataTypes.STRING,
      deathaddress: DataTypes.STRING,
      deathcity: DataTypes.STRING,
      deathcountry_id: DataTypes.STRING,
      deathdate: DataTypes.DATE,
      firstname: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      lastname: DataTypes.STRING,
      nicknames: DataTypes.STRING,
      photo: DataTypes.STRING,
      remark: DataTypes.STRING,
      mannerofdeath_id: DataTypes.STRING,
      causeofdeath_id: DataTypes.STRING,
      classification_id: DataTypes.STRING,
      is_deceased: DataTypes.BOOLEAN
    },
    {
      underscored: true
    }
  );

  Person.associate = function(models) {
    Person.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Person;
};
