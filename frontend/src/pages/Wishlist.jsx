// import { useEffect, useState } from "react";
// import API from "../api";
// function Wishlist() {
//   const [wishlist, setWishlist] = useState([]);
//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       if (!token) return;
//       try {
//         const { data } = await API.get(
//           "/wishlist", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setWishlist(data);
//       } catch (err) {
//         console.log("Error fetching wishlist:", err);
//       }
//     };
//     fetchWishlist();
//   }, [token]);

//   const removeFromWishlist = async (productId) => {
//     try {
//       await API.delete(`/wishlist/${productId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setWishlist((prev) => prev.filter((p) => p._id !== productId));
//     } catch (err) {
//       console.log("Error removing from wishlist:", err);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
//         My Wishlist
//       </h2>
//       {wishlist.length === 0 ? (
//         <p className="text-center text-gray-600">Your wishlist is empty.</p>
//       ) : (
//         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {wishlist.map((product) => (
//             <div
//               key={product._id}
//               className="border rounded-xl p-5 bg-white shadow-md relative"
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-52 object-cover mb-4 rounded-md"
//               />
//               <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
//               <p className="text-sm text-gray-600 mb-2">{product.description}</p>
//               <p className="text-gray-500 text-sm mb-1">
//                 Category: {product.category?.name || "N/A"}
//               </p>
//               <p className="text-yellow-500 text-sm mb-2">
//                 ⭐ {product.rating || 0} / 5
//               </p>
//               <p className="text-indigo-600 font-bold text-lg mb-2">
//                 ${product.price}
//               </p>
//               <button
//                 onClick={() => removeFromWishlist(product._id)}
//                 className="absolute top-2 right-2 text-red-500 font-bold"
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Wishlist;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedMap, setAddedMap] = useState({});
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetch = async () => {
      if (!token) { setLoading(false); return; }
      try {
        const { data } = await API.get("/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(data);
      } catch (err) { console.log(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, [token]);

  const removeFromWishlist = async (productId) => {
    try {
      await API.delete(`/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) { console.log(err); }
  };

  const addToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Please login first");
    const key = `cart_${user._id}`;
    const cart = JSON.parse(localStorage.getItem(key)) || [];
    const exists = cart.find((i) => i._id === product._id);
    const updated = exists
      ? cart.map((i) => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...cart, { ...product, quantity: 1 }];
    localStorage.setItem(key, JSON.stringify(updated));
    setAddedMap((prev) => ({ ...prev, [product._id]: true }));
    setTimeout(() => setAddedMap((prev) => ({ ...prev, [product._id]: false })), 2000);
  };

  // Skeleton loader
  if (loading) return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="h-7 bg-gray-200 rounded w-40 mb-8 animate-pulse"/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
              <div className="aspect-square bg-gray-100"/>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4"/>
                <div className="h-3 bg-gray-100 rounded w-1/2"/>
                <div className="h-5 bg-gray-100 rounded w-1/3"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Empty state
  if (wishlist.length === 0) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4"
         style={{ animation: "fadeIn 0.4s ease" }}>
      <div className="text-6xl mb-5">🤍</div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
      <p className="text-gray-400 text-sm mb-6">Save products you love!</p>
      <Link to="/products"
            className="px-6 py-3 bg-black text-white rounded-xl text-sm font-medium
                       hover:opacity-85 transition-all">
        Explore Products
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10"
         style={{ animation: "fadeIn 0.4s ease" }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-900 mb-8">
          My Wishlist <span className="text-gray-400 text-lg font-normal">({wishlist.length})</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlist.map((product, idx) => (
            <div key={product._id}
                 className="group bg-white border border-gray-100 rounded-2xl overflow-hidden
                            hover:-translate-y-1 hover:shadow-lg hover:border-gray-200 transition-all duration-200"
                 style={{ animation: `fadeUp 0.5s ${idx * 0.07}s cubic-bezier(0.22,1,0.36,1) both` }}>

              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img src={product.image} alt={product.name}
                     className="w-full h-full object-cover group-hover:scale-105
                                transition-transform duration-500"/>
                {/* Remove btn */}
                <button onClick={() => removeFromWishlist(product._id)}
                        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full
                                   bg-white border border-gray-200 flex items-center
                                   justify-content-center text-xs text-gray-400
                                   opacity-0 group-hover:opacity-100 hover:text-red-500
                                   hover:bg-red-50 hover:scale-110 transition-all shadow-sm
                                   flex items-center justify-center">
                  ✕
                </button>
              </div>

              {/* Info */}
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  {product.category?.name || "Gadget"}
                </p>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="text-amber-400 text-xs">
                    {"★".repeat(Math.round(product.rating || 0))}
                  </span>
                  <span className="text-xs text-gray-400">{product.rating?.toFixed(1)}</span>
                </div>
                <p className="text-base font-bold text-gray-900 mt-1.5">
                  ₹{product.price?.toLocaleString()}
                </p>
              </div>

              {/* Add to cart */}
              <button onClick={() => addToCart(product)}
                      className={`w-full py-3 border-t border-gray-100 text-xs font-medium
                                  transition-all
                                  ${addedMap[product._id]
                                    ? "bg-green-50 text-green-600"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}>
                {addedMap[product._id] ? "✓ Added to Cart" : "+ Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

export default Wishlist;
