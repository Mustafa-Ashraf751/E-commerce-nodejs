const Product = require("../models/productModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const catchAsync = require("../utils/catchAsync");

//Create product associated with user
const createProduct = catchAsync(async (req, res, next) => {
  req.body.user = req.params.id;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
});

//Get all products associated with user
const getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ user: req.params.id });
  if (!products) {
    throw new CustomError.NotFoundError(
      "No products associated with this user"
    );
  }
  res.status(StatusCodes.OK).json({ products });
});

const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.productId,
    user: req.params.id,
  });
  if (!product) {
    throw new CustomError.NotFoundError(
      "No Product with this id please try again"
    );
  }
  res.status(StatusCodes.OK).json({ product });
});

//Update the product
const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    { _id: req.params.productId, user: req.params.id },
    req.body,
    {
      new: true,
    }
  );
  if (!product) {
    throw new CustomError.NotFoundError(
      "No Product with this id please try again"
    );
  }
  res.status(StatusCodes.OK).json({ product });
});

//Delete Product
const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete({
    _id: req.params.productId,
    user: req.params.id,
  });
  if (!product) {
    throw new CustomError.NotFoundError(
      "No Product with this id please try again"
    );
  }
  res.status(StatusCodes.OK).json({ message: "Product deleted successfully!" });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
