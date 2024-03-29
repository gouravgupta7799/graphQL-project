const gql = require("graphql-tag");

const typeDefs = gql`

extend schema
  @link(url: "https://specs.apollo.dev/federation/v2.5",
        import: ["@key"])
        
  type Query {
    users: [User] #return array of users
    user(id: ID): User #return users by id
  }
  type User @key(fields:"id"){
    id: ID
    firstName: String
    lastName: String
    email:String
    password:String
    age: Int
    token:String
  }

  type Mutation {
    signup(firstName: String, lastName: String, email:String, password:String, age: Int): User
    login(email:String, password:String): User
  }
`;

module.exports = { typeDefs };