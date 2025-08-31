import express from "express";
import { getUserProfile, loginUser, registerUser,updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();
 
//  new   way seperate logic

router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/profile" ,protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);  // ✅ new route

export default router;








//    old way   login + endpoint on same place


// router.post("/register", async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "user already exists" })
//         }

//         const hashPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({
//             name,
//             email,
//             password: hashPassword,
//         });
//         await newUser.save();
//         res.status(201), json({ message: "User registered successfully" });
//     }
//     catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// });
// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             res.status(400).json({ message: "Invalid credentials" })
//         }

//         const ismatch = await bcrypt.compare(password, user.password);
//         if (!ismatch) {
//             res.status(400).json({ message: "Invalid credentials" })
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: "1d",
//         });
//         res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//     } catch (err) {
//         res.status(500).json({ message: "Server error" })
//     }
// });

// export default router;