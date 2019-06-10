'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('crimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      criminal_id: {
        type: Sequelize.INTEGER
      },
      remark: {
        type: Sequelize.TEXT
      },
      is_solved: {
        type: Sequelize.BOOLEAN
      },
      type_id: {
        type: Sequelize.INTEGER
      },
      victim_id: {
        type: Sequelize.INTEGER
      },
      committeddate: {
        type: Sequelize.DATE
      },
      motive_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('crimes');
  }
};