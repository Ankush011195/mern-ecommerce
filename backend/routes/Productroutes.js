import express from "express";
import { getProducts, getProductsbyId, createProductReview } from "../controllers/productController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

// search endpoint
router.get("/search", async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.json([]);
    }
    const products = await products.find({
      name: { $regex: query, $options: "i" }, // case-insensitive
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
});

router.get("/" , getProducts);
router.get("/:id" , getProductsbyId);
router.post("/:id/review", protect, createProductReview);






export default router;