const gql = require('graphql-tag');

const typeDefs = gql`

extend schema
  @link(url: "https://specs.apollo.dev/federation/v2.5",
        import: ["@key"])


  type Query {
    courseDetails:[Course]
    oneCourse(id:ID):Course
    students:[Student]
    student(id:ID):Student
  }

  type Course {
    id:ID
    name: String,
    details: String,
    price: Int,
  }

  type Student {
    id: ID
    studentName: String
    studentContect:String
    studentEmail:String
  }

  type Mutation{
    addCourse(name:String, details:String, price:Int):Course
    newStudent(studentName:String, studentContect:String, studentEmail:String):Student
  }
`

module.exports = { typeDefs };