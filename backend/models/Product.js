// // backend/models/Product.js
// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Product name is required"],
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: [true, "Product description is required"],
//     },
//     image: {
//       type: String,
//       required: [true, "Image URL is required"],
//       // Example for now: "/images/sample.jpg" or a full https URL
//     },
//     brand: {
//       type: String,
//       default: "Generic",
//       trim: true,
//     },
//     category: {
//       type: String,
//       default: "General",
//       trim: true,
//     },
//     price: {
//       type: Number,
//       required: [true, "Price is required"],
//       min: [0, "Price cannot be negative"],
//     },
//     countInStock: {
//       type: Number,
//       required: true,
//       default: 0,
//       min: [0, "Stock cannot be negative"],
//     },
//     rating: {
//       type: Number,
//       required: true,
//       default: 0,
//       min: 0,
//       max: 5,
//     },
//     numReviews: {
//       type: Number,
//       required: true,
//       default: 0,
//       min: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Product = mongoose.model("Product", productSchema);
// export default Product;

// backend/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    brand: {
      type: String,
      default: "Generic",
      trim: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },

    // New: Reviews array
    reviews: [
      {
        name: { type: String, required: true }, // reviewer's name
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      },
    ],
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
