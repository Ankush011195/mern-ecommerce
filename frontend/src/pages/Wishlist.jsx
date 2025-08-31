import { useEffect, useState } from "react";
import axios from "axios";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) return;
      try {
        const { data } = await axios.get("http://localhost:5000/api/wishlist/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(data);
      } catch (err) {
        console.log("Error fetching wishlist:", err);
      }
    };
    fetchWishlist();
  }, [token]);

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.log("Error removing from wishlist:", err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        My Wishlist
      </h2>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl p-5 bg-white shadow-md relative"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover mb-4 rounded-md"
              />
              <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="text-gray-500 text-sm mb-1">
                Category: {product.category?.name || "N/A"}
              </p>
              <p className="text-yellow-500 text-sm mb-2">
                ⭐ {product.rating || 0} / 5
              </p>
              <p className="text-indigo-600 font-bold text-lg mb-2">
                ${product.price}
              </p>
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-2 right-2 text-red-500 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
