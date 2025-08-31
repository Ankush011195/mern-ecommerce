import Order from "../models/Order.js";

// Create new order
export const addOrder = async (req, res) => {
  try{

    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
    
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }
    
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });
    
    const createdOrder = await order.save();
     res.status(201).json(createdOrder);
  }
 catch (err) {
    console.error("Error in addOrder:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get logged in user orders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// Get all orders (admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name email");
    res.json(orders);
  } catch (err) {
    console.error("Error in getAllOrders:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

