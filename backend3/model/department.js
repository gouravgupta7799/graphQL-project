


const Sequelize = require('sequelize');
const sequelize = require('../utill/dataBase');

const department = sequelize.define('Department', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dapartmentName: {
    type: Sequelize.STRING,
  }
})

module.exports = department;
