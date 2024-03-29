const gql = require('graphql-tag');

const typeDefs = gql`

extend schema
  @link(url: "https://specs.apollo.dev/federation/v2.5",
        import: ["@key"])


  type Query {
    courseDetails:[Course]
    oneCourse(id:ID):Course
    students:[Student]
    student(Id:ID):Student
  }

  type Course {
    Id:ID
    name: String,
    details: String,
    price: Int,
  }

  type Student {
    Id: ID
    name: String
    contect:String
    email:String
  }

  type Mutation{
    addCourse(name:String, details:String, price:Int):Course
    newStudent(name:String, contect:String, email:String):Student
  }
`

module.exports = { typeDefs };