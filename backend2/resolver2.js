
const Product = require('./model/products');

const resolvers = {

  Query: {
    products: async () => await Product.find({}),
    Product: async (parent, args) => await Product.findById(args.id)
  },
  Mutation: {
    addProduct: async (parent, args) => {

      const prod = Product({
        productName: args.productName,
        price: args.price,
        details: args.details,
        imageUrl: args.imageUrl,
        discount: args.discount,
        offer: args.offer,
        gender: args.gender,
        stock: args.stock
      })
      return prod.save()
    }
  }
}

module.exports = { resolvers }