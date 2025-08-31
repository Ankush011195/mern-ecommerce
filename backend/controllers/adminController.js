// import Order from "../models/orderModel.js";

// // Get all orders (admin only)
// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate("user", "id name email");
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };