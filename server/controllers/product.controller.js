import Product from "../models/product.model.js";
import mongoose from "mongoose";

// adding new product
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const newProduct = new Product({
    name,
    price,
    image,
  });

  try {
    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "Product added", data: newProduct });
  } catch (error) {
    console.log("Error in Create Product", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get all products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  try {
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in Get all products", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve all products" });
  }
};

// get one product by id
export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Id format" });
  }

  const product = await Product.findById({ _id: id });

  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log("Error in getting a product", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve product" });
  }
};

// delete a product by id
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Id format" });
  }

  const product = await Product.findByIdAndDelete({ _id: id });

  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error in deleting product", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete product" });
  }
};

// update a product by id
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Id format" });
  }

  const product = await Product.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    res
      .status(200)
      .json({ success: true, message: "Product updated", data: product });
  } catch (error) {
    console.log("Error in updating a product", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};
