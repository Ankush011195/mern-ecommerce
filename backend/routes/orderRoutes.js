import express from "express";
import { addOrder, getMyOrders , getAllOrders } from "../controllers/orderController.js";
import { protect  } from "../middleware/authMiddleware.js";
import { admin} from "../middleware/adminMiddleware.js";


const router = express.Router();

router.post("/", protect, addOrder); // Create order
router.get("/myorders", protect, getMyOrders); // Get user orders

// router.get("/", protect, admin, getAllOrders);


export default router;
