const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  getUser,
  UpdateUser,
  deleteUser,
} = require("../controllers/UserController");

router.route("/").post(createUser).get(getAllUsers);
router.route("/:id").get(getUser);
router.route("/updateUser/:id").patch(UpdateUser);
router.route("/deleteUser/:id").delete(deleteUser);
module.exports = router;
