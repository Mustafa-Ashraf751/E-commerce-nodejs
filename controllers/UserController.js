const User = require("../models/UserModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const asyncCatch = require("../utils/catchAsync");

//Create User
const createUser = asyncCatch(async (req, res, next) => {
  const { name, email, password } = req.body;
  const findUserByEmail = await User.findOne({ email });
  // if (findUserByEmail) {
  //   throw new CustomError.BadRequestError("Email is already exist");
  // }
  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json(user);
});

//Get all users
const getAllUsers = async (req, res) => {
  const user = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({
    totalUsers: user.length,
    user,
  });
};

//Get single user
const getUser = asyncCatch(async (req, res, next) => {
  const { id: userId } = req.params;

  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    throw new CustomError.NotFoundError("User does't exist");
  }

  res.status(StatusCodes.OK).json({ user });
});

//Update user profile
const UpdateUser = asyncCatch(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    throw new CustomError.NotFoundError("User doesn't exist");
  }
  res.status(StatusCodes.OK).json({ user });
});

//Delete User
const deleteUser = asyncCatch(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new CustomError.NotFoundError("User doesn't exist");
  }
  res.status(StatusCodes.OK).json({
    message: "User deleted successfully",
  });
});

module.exports = { getAllUsers, createUser, getUser, UpdateUser, deleteUser };
