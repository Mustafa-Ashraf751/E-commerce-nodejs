const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const express = require("express");
const router = express.Router();

router.route("/:id").post(createProduct).get(getProducts);
router
  .route("/:id/:productId")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
