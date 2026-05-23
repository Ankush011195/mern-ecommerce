import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getUsers,
  deleteUser,
  getOrders,
  deliverOrder,
  getStats,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/users",
  protect,
  adminMiddleware,
  getUsers
);

router.delete(
  "/users/:id",
  protect,
  adminMiddleware,
  deleteUser
);

router.get(
  "/orders",
  protect,
  adminMiddleware,
  getOrders
);

router.put(
  "/orders/:id/deliver",
  protect,
  adminMiddleware,
  deliverOrder
);

router.get(
  "/stats",
  protect,
  adminMiddleware,
  getStats
);

router.post(
  "/products",
  protect,
  adminMiddleware,
  addProduct
);

router.put(
  "/products/:id",
  protect,
  adminMiddleware,
  updateProduct
);

router.delete(
  "/products/:id",
  protect,
  adminMiddleware,
  deleteProduct
);

export default router;