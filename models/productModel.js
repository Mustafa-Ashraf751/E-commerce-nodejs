const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name to product"],
    trim: true,
    maxlength: [100, "The product name must't exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter price to product"],
    validate: {
      validator: (value) => value > 0,
      message: "Please enter positive value to product!",
    },
  },
  image: {
    type: String,
    default: "../public/uploads/example.jpeg.png",
  },
  description: {
    type: String,
    required: [true, "Please provide description for product"],
    maxlength: [1000, "Product description must't exceed 1000 characters"],
  },
  category: {
    type: String,
    required: [true, "Please provide product category"],
    enum: ["kitchen", "bedroom", "office"],
  },
  company: {
    type: String,
    required: [true, "Please provide company name"],
    enum: {
      values: ["Ikea", "liddy", "marcos"],
      message: "${VALUE} is not supported",
    },
  },
  colors: {
    type: [String],
    default: ["#222"],
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  freeShipping: {
    type: Boolean,
    default: false,
  },
  inventory: {
    type: Number,
    required: true,
    default: 15,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

//Require all review associated with product

module.exports = mongoose.model("Product", ProductSchema);
