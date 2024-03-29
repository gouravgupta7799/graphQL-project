
const Student = require('./model/studentModel');
const Course = require('./model/courseModel');


const resolvers = {
  Query: {
    courseDetails: async () => { },
    oneCourse: async () => { },
    students: async () => await Student.findAll(),
    student: async (parant, args) => await Student.findByPk(args.id),
  },

  Mutation: {
    addCourse: (parent, args) => {

    },

    newStudent: async (parent, args) => {
      try {
        const { name, email, contect } = args;
        const alreadyexist = await Student.findOne({ where: { email } })

        if (alreadyexist) {
          console.log('User already exist')
          throw new error({ message: 'User already exist' });
        }
        console.log(name ,email , contect)
        if (name && email && contect) {

          const student = await Student.create({
            name: name,
            contect: contect,
            email: email
          })
          return student;

        } else {
          throw new error({ message: 'some feilds are not filled try after rechecking' })
        }
      }
      catch (error) {
        throw error;
      }
    }
  }
}

module.exports = { resolvers };