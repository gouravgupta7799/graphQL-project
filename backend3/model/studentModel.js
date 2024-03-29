const Sequelize = require('sequelize');
const sequelize = require('../utill/dataBase');

const Student = sequelize.define('student', {

  Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contect: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    Unique: true,
    allowNull: false
  },
});


module.exports = Student;