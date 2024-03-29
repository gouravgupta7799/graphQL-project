

const gql = require('graphql-tag');

const typeDefs = gql`

extend schema
  @link(url: "https://specs.apollo.dev/federation/v2.5",
        import: ["@key"])
        
  type Query {
    products: [Product] #retrun product list
    Product(id:ID): Product #return single product
  }

  type User @key(fields : "id") {
    id : ID! 
    products : [Product]!

  }

  type Product @key(fields:"id userId") {
    id : ID
    productName : String
    price : Int
    details : String
    imageUrl:String
    discount:String
    offer:String
    gender:String
    stock:Int
    userId:ID
  }

  type Mutation {
    addProduct(productName:String, details:String, price:Int, imageUrl:String, discount:String, offer:String, gender:String, stock:Int, userId:ID): Product  
  }
`

module.exports = { typeDefs };

// {
//   "productName" : "woman Ethnic dress",
//   "details": "womans dress",
//   "price":"1850",
//   "imageUrl":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhMTExI…",
//   "discount":"$2500",
//   "offer":"26% off",
//   "gender":"Female",
//   "stock":50,
// }