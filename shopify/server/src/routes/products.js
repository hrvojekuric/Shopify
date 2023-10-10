import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";

import { productModel } from "../models/Products.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/getProducts", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/createProduct", verifyToken, async (req, res) => {
  const { title, price, description, category, image, rating, productOwner } =
    req.body;
  try {
    const product = new productModel({
      _id: new mongoose.Types.ObjectId(),
      title,
      price,
      description,
      category,
      image,
      rating,
      productOwner,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/removeItem/:productId", verifyToken, async (req, res) => {
  const productId = req.params.productId;
  try {
    if (!productId) {
      return res.status(400).json({ message: "There is no product id." });
    }

    const result = await productModel.deleteOne({ _id: productId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Product deleted successfully." });
    } else {
      res.status(404).json({ message: "Product not found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
});

export { router as ProductRouter };
