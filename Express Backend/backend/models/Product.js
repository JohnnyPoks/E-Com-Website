const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  badge: {
    type: Boolean,
    required: true,
  },
  // countInStock: {
  //   type: Number,
  //   required: true,
  // },
  // category: {
  //   type: String,
  //   required: true,
  // },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
