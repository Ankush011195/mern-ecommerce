import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },   // 👈 added
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Cash on Delivery",
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    razorpayOrderId: {
      type: String,
   },
      status: {
      type: String,
      default: "PENDING",
     },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
