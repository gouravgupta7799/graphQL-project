require('dotenv').config();
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require('@apollo/subgraph');
const sequelize = require('./utill/dataBase');

const Student = require('./model/studentModel');
const StudentCourse = require('./model/studentCourse');
const Department = require('./model/department');

const { typeDefs } = require('./typeDefs3');
const Course = require('./model/courseModel');
const { resolvers } = require('./resolver');


// Student.hasMany(Course);
// Course.belongsTo(Student);

// Department.hasMany(Student);
// Student.belongsTo(Department);



// Student.hasMany(StudentCourse);
// StudentCourse.belongsTo(Student);

// Department.hasMany(StudentCourse);
// StudentCourse.belongsTo(Department);


Student.hasMany(Course);
Course.belongsTo(Student);

Department.hasMany(Course);
Course.belongsTo(Department);



Student.hasMany(StudentCourse);
StudentCourse.belongsTo(Student);

Department.hasMany(StudentCourse);
StudentCourse.belongsTo(Department);


sequelize
  // .sync({ force: true })
  .sync()
  .catch(err => console.log(err))




async function start3() {
  const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }) });
  const { url } = await startStandaloneServer(server, {
    listen: 4003,
  })
  console.log(`servr run on ${url}`)
}
start3()