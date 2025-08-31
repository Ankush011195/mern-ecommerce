import User from "../models/User.js";

export const getWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.json(user.wishlist);
};

export const addToWishlist = async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.productId;

  if (user.wishlist.includes(productId)) {
    return res.status(400).json({ message: "Product already in wishlist" });
  }

  user.wishlist.push(productId);
  await user.save();
  res.json({ message: "Added to wishlist" });
};

export const removeFromWishlist = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.wishlist = user.wishlist.filter((id) => id.toString() !== req.params.productId);
  await user.save();
  res.json({ message: "Removed from wishlist" });
};
