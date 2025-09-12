import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState(""); // search state

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category"); // read category from URL

  // Fetch products (with category filter if exists)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "https://mern-ecommerce-pg1x.onrender.com/api/products";
        if (category) {
          url += `?category=${category}`;
        }
        const { data } = await axios.get(url);
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [category]);

  // Fetch user's wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const { data } = await API.get("/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(data.map((p) => p._id)); // store only product IDs
      } catch (err) {
        console.log("Error fetching wishlist:", err);
      }
    };
    fetchWishlist();
  }, []);

  // Add to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Add to wishlist
  const addToWishlist = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    try {
      await API.post(
        `/wishlist/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlist([...wishlist, productId]); // update local state
      alert("Added to wishlist!");
    } catch (err) {
      console.log(err);
      alert("Failed to add to wishlist");
    }
  };

  // Filter products by search (client-side)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        {category ? `${category} Products` : "Products"}
      </h2>

      {/* 🔎 Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-2 w-1/2"
        />
      </div>

      {/* Products Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl p-5 flex flex-col justify-between items-center bg-white shadow-md hover:shadow-lg transition"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover mb-4 rounded-md"
              />

              {/* Product Info */}
              <div className="w-full text-center">
                <h4 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {product.description}
                </p>
                <p className="text-indigo-600 font-bold text-lg mb-2">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Stock: {product.countInStock}
                </p>

                {/* Average Rating */}
                <p className="text-sm text-yellow-500 mb-2">
                  Rating: {product.rating.toFixed(1)} / 5 ({product.numReviews}{" "}
                  reviews)
                </p>

                {/* Reviews */}
                {product.reviews && product.reviews.length > 0 && (
                  <div className="text-left mt-2 max-h-32 overflow-y-auto">
                    <h5 className="font-semibold text-gray-700 mb-1">Reviews:</h5>
                    {product.reviews.map((review, index) => (
                      <div key={index} className="border-b pb-1 mb-1">
                        <p className="text-gray-800 font-semibold">
                          {review.name}
                        </p>
                        <p className="text-yellow-500">
                          Rating: {review.rating} / 5
                        </p>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4 w-full">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition flex-1"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => addToWishlist(product._id)}
                  className={`px-4 py-2 rounded-lg flex-1 transition ${
                    wishlist.includes(product._id)
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {wishlist.includes(product._id)
                    ? "❤️ Wishlisted"
                    : "🤍 Wishlist"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Products;
