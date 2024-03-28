const Sequelize = require('sequelize');
const sequelize = require('../utill/dataBase');

const studentCourse = sequelize.define('StudentCourse', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
})

module.exports = studentCourse;