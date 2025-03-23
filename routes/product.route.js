const express = require("express");
const Product = require("../model/product.model");
const { validateUserSignIn } = require("../validation/user");
const {
  updateProduct,
  getSingleProduct,
  getAllProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/product.controller");
const router = express.Router();

// ✅ Create a Product
router.post("/", createProduct);

// ✅ Delete a Product
router.delete("/:id", deleteProduct);

// ✅ Get All Products
router.get("/", getAllProduct);

//  ✅ Get single Products
router.get("/:id", getSingleProduct);

// ✅ Update a Product
router.patch("/:id", updateProduct);

module.exports = router;
