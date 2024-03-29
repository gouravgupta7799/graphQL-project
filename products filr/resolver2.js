
const Product = require('./model/products');

const resolvers = {

  Query: {
    products: async () => await Product.findAll(),
    Product: async (parent, args) => await Product.findByPk(args.id)
  },
  Mutation: {
    addProduct: async (parent, args) => {
      console.log(parent, args)
      const prod = await Product.create({
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
      return prod;
    }
  },
  Product: {
    __resolveReference(product, { Product }) {
      return Product.findByPk(product.id);
    },
  },

  User: {
    async products(parent) {
      try {
        let findProduct = await Product.findAll({ Where: { userId: parent.id } })
        return findProduct
      } catch (error) {
        console.log(error)
        return error
      }
    }
  }
}

module.exports = { resolvers }