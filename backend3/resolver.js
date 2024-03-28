
const Student = require('./model/studentModel');
const Course = require('./model/courseModel');


const resolvers = {
  Query: {
    courseDetails: async () => { },
    oneCourse: async () => { },
    students: async () => { },
    student: async () => { },
  },

  Mutation: {
    addCourse: (parent, args) => {

    },

    newStudent: async (parent, args) => {
      try {
        const { studentName, studentEmail, studentContect } = args;
        // console.log(studentName, studentEmail, studentContect)
        // let alreadyexist = await Student.findOne({ where: { studentEmail: studentEmail } });
        console.log(studentEmail)
        const alreadyexist = await Student.findAll({ where: { studentEmail } })
        console.log('>>>>', alreadyexist)
        if (alreadyexist) {

          throw new error({ msg: 'User already exist' });
        }
        if (studentName && studentEmail && studentContect) {

          const student = await Student.create({
            studentName: studentName,
            studentContect: studentContect ,
            studentEmail: studentEmail 
          })
          return student;
        } else {

        }
      }
      catch (error) {
        throw error;
      }
    }
  }
}

module.exports = { resolvers };