const mongoose = require('mongoose');

const schema = mongoose.Schema;

const productSchema = new schema({
  productName: String,
  price: Number,
  details: String,
  imageUrl: String,
  discount: String,
  offer: String,
  gender: String,
  stock: Number
})

module.exports = mongoose.model('Product', productSchema);