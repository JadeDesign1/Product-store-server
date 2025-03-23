const Product = require("../model/product.model");

const createProduct = async (req, res) => {
  const { name, price, image, createdBy } = req.body;

  // Check for missing fields
  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Ensure the user is authenticated
  if (!req.body.createdBy) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: User information is missing",
    });
  }

  console.log(createdBy);

  try {
    const newProduct = {
      name,
      price,
      image,
      createdBy,
    };

    const product = await Product.create(newProduct);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ success: false, message: "No product with the provided ID" });
  }
};

const getAllProduct = async (req, res) => {
  try {
    console.log("GET /api/product request received");
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const product = await Product.findById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  console.log(id, updatedData);

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No product with the provided ID" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
