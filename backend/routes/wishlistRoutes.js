import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/", protect, getWishlist); // Get user's wishlist
router.post("/:productId", protect, addToWishlist); // Add product
router.delete("/:productId", protect, removeFromWishlist); // Remove product

export default router;
