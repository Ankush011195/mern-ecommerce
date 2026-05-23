import express from "express";
import { getUserProfile, loginUser, registerUser,updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { googleLogin } from "../controllers/userController.js";


const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/profile" ,protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);  
router.post("/google-login", googleLogin);



export default router;


