import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// getting all users
export const getUsers = async (req, res) => {
  try {

    const users = await User.find({}).select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// for delete user
export const deleteUser = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// get all orders
export const getOrders = async (req, res) => {
  try {

    const orders = await Order.find({})
      .populate("user", "name email");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// deliver order
export const deliverOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();

    res.json(order);
  } catch (err) {  
        console.log("ERROR:", err.message); 
    res.status(500).json({ message: err.message });
  }
};

// dashboard stats
export const getStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalProducts = await Product.countDocuments();

    const revenue = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      revenue: revenue[0]?.total || 0,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// product add
export const addProduct = async (req, res) => {
  try {

    const product = new Product(req.body);

    await product.save();

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// update product
export const updateProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// delete product
export const deleteProduct = async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};