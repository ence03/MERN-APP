import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// creating a product
router.post("/", createProduct);
// get all products
router.get("/", getProducts);
// get a product
router.get("/:id", getProductById);
// delete a product
router.delete("/:id", deleteProduct);
// update a product
router.patch("/:id", updateProduct);

export default router;
