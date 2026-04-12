import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productroutes from "./routes/Productroutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
const app = express();

//middlware
app.use(cors());
app.use(express.json());   //  to pass json request to body
app.use("/api/users", userRoutes);
app.use("/api/products" , productroutes);
app.use("/api/orders",orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payment",paymentRoutes)

app.get('/',(req,res)=>{
    res.send("API is running")
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log("MongoDB is connected"))
.catch((err)=>console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=> console.log(`Server running on port ${PORT}`))