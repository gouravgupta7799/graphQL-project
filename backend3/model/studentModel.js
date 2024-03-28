const Sequelize = require('sequelize');
const sequelize = require('../utill/dataBase');

const Student = sequelize.define('student', {

  Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  studentContect: {
    type: Sequelize.STRING,
    allowNull: false
  },
  studentEmail: {
    type: Sequelize.STRING,
    Unique: true,
    allowNull: false
  },
});


module.exports = Student;