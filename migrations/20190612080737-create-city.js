'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cityname: {
        type: Sequelize.STRING
      },
      citycode: {
        type: Sequelize.STRING
      },
      township: {
        type: Sequelize.STRING
      },
      townshipcode: {
        type: Sequelize.STRING
      },
      county: {
        type: Sequelize.STRING
      },
      countycode: {
        type: Sequelize.STRING
      },
      countrypart: {
        type: Sequelize.STRING
      },
      countrypartcode: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cities');
  }
};