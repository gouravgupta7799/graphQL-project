
const Product = require('./model/products');

const resolvers = {

  Query: {
    products: async () => await Product.find({}),
    Product: async (parent, args) => await Product.findById(args.id)
  },
  Mutation: {
    addProduct: async (parent, args) => {
      console.log(parent, args)
      const prod = Product({
        productName: args.productName,
        price: args.price,
        details: args.details,
        imageUrl: args.imageUrl,
        discount: args.discount,
        offer: args.offer,
        gender: args.gender,
        stock: args.stock,
        userId: args.userId,

      })
      return prod.save()
    }
  },
  Product: {
    __resolveReference(product, { Product }) {
      return Product.findById(product.id);
    },
  },

  User: {
    async products(parent) {
      try {
        let findProduct = await Product.find({ userId: parent.id })
        return findProduct
      } catch (error) {
        console.log(error)
        return error
      }
    }
  }
}

module.exports = { resolvers }