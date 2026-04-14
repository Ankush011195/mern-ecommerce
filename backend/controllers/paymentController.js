import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    const { amount, orderItems, shippingAddress } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const order = await Order.create({
      user: req.user._id,
      orderItems,           
      shippingAddress,       
      paymentMethod: "Razorpay",
      totalPrice: amount,
      razorpayOrderId: razorpayOrder.id,
      status: "PENDING",
    });

    res.json({
      razorpayOrder,
      dbOrderId: order._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating order" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      
      //  UPDATE ORDER
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          status: "PAID",
          isPaid: true,
          paidAt: new Date(),
        },
        { new: true }
      );

      return res.json({ success: true, message: "Payment Verified" });
    } else {
      return res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};