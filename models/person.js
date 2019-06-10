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
      underscored: true,
      tableName: 'people',
      getterMethods: {
        fullname() {
          return this.firstname + ' ' + this.lastname;
        }
      }
    }
  );

  Person.associate = function(models) {
    Person.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

    Person.belongsTo(models.Country, {
      foreignKey: 'birthcountry_id',
      as: 'birthcountry'
    });

    Person.belongsTo(models.Country, {
      foreignKey: 'deathcountry_id',
      as: 'deathcountry'
    });

    Person.belongsTo(models.CauseOfDeath, {
      foreignKey: 'causeofdeath_id',
      as: 'cause_of_death'
    });

    Person.belongsTo(models.MannerOfDeath, {
      foreignKey: 'mannerofdeath_id',
      as: 'manner_of_death'
    });

    Person.belongsTo(models.Classification, {
      foreignKey: 'classification_id',
      as: 'classification'
    });

    // HASMANY

    Person.hasMany(models.Crime, {
      foreignKey: 'criminal_id',
      as: 'crimes',
      onDelete: 'CASCADE'
    });

    Person.hasMany(models.Crime, {
      foreignKey: 'victim_id',
      as: 'victim_of',
      onDelete: 'CASCADE'
    });

    Person.hasMany(models.Relationship, {
      foreignKey: 'person1_id',
      as: 'relations',
      onDelete: 'CASCADE'
    });

    Person.hasMany(models.Conviction, {
      foreignKey: 'person_id',
      as: 'convictions',
      onDelete: 'CASCADE'
    });

    Person.hasMany(models.Detail, {
      foreignKey: 'person_id',
      as: 'details',
      onDelete: 'CASCADE'
    });

    Person.hasMany(models.Event, {
      foreignKey: 'person_id',
      as: 'events',
      onDelete: 'CASCADE'
    });

    Person.belongsToMany(models.Tag, {
      through: 'people_tags',
      foreignKey: 'person_id',
      as: 'tags',
      onDelete: 'CASCADE'
    });
  };

  return Person;
};

// Custom methods:
// _customGetters;
// _customSetters;
// validators;
// _hasCustomGetters;
// _hasCustomSetters;
// rawAttributes;
// _isAttribute;

// getUser;
// setUser;
// createUser;
// getBirthcountry;
// setBirthcountry;
// createBirthcountry;
// getDeathcountry;
// setDeathcountry;
// createDeathcountry;
// getCause_of_death;
// setCause_of_death;
// createCause_of_death;
// getManner_of_death;
// setManner_of_death;
// createManner_of_death;
// getClassification;
// setClassification;
// createClassification;
// getCrimes;
// countCrimes;
// hasCrime;
// hasCrimes;
// setCrimes;
// addCrime;
// addCrimes;
// removeCrime;
// removeCrimes;
// createCrime;
// getVictim_of;
// countVictim_of;
// hasVictim_of;
// setVictim_of;
// addVictim_of;
// removeVictim_of;
// createVictim_of;
// getConvictions;
// countConvictions;
// hasConviction;
// hasConvictions;
// setConvictions;
// addConviction;
// addConvictions;
// removeConviction;
// removeConvictions;
// createConviction;
// getDetails;
// countDetails;
// hasDetail;
// hasDetails;
// setDetails;
// addDetail;
// addDetails;
// removeDetail;
// removeDetails;
// createDetail;
// getEvents;
// countEvents;
// hasEvent;
// hasEvents;
// setEvents;
// addEvent;
// addEvents;
// removeEvent;
// removeEvents;
// createEvent;
// getTags;
// countTags;
// hasTag;
// hasTags;
// setTags;
// addTag;
// addTags;
// removeTag;
// removeTags;
// createTag;
