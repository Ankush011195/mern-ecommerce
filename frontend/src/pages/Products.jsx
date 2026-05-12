// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import API from "../api";
// import axios from "axios";

// function Products() {
//   const [products, setProducts] = useState([]);
//     const [cart, setCart] = useState(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) return [];
//     const savedCart = localStorage.getItem(`cart_${user._id}`);
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   const [wishlist, setWishlist] = useState([]);
//   const [search, setSearch] = useState(""); // search state

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const category = queryParams.get("category"); // read category from URL

//   // Fetch products (with category filter if exists)
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         let url = "https://mern-ecommerce-pg1x.onrender.com/api/products";
//         if (category) {
//           url += `?category=${category}`;
//         }
//         const { data } = await axios.get(url);
//         setProducts(data);
//       } catch (error) {
//         console.log("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, [category]);

//   // Fetch user's wishlist
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       const token = sessionStorage.getItem("token");
//       if (!token) return;

//       try {
//         const { data } = await API.get("/wishlist", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setWishlist(data.map((p) => p._id)); 
//       } catch (err) {
//         console.log("Error fetching wishlist:", err);
//       }
//     };
//     fetchWishlist();
//   }, []);

//   // Add to cart
//   const addToCart = (product) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//     alert("Please login first");
//     return;
//   }
//     const existingItem = cart.find((item) => item._id === product._id);
//     let updatedCart;
//     if (existingItem) {
//       updatedCart = cart.map((item) =>
//         item._id === product._id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//     } else {
//       updatedCart = [...cart, { ...product, quantity: 1 }];
//     }
//     setCart(updatedCart);
//     // localStorage.setItem("cart", JSON.stringify(updatedCart));
//      localStorage.setItem(`cart_${user._id}`, JSON.stringify(updatedCart));
//      alert("Product added to cart");
//   };

//   // Add to wishlist
//   const addToWishlist = async (productId) => {
//     const token = sessionStorage.getItem("token");
//     if (!token) return alert("Please login first");

//     try {
//       await API.post(
//         `/wishlist/${productId}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setWishlist([...wishlist, productId]); // update local state
//       alert("Added to wishlist!");
//     } catch (err) {
//       console.log(err);
//       alert("Failed to add to wishlist");
//     }
//   };

//   // Filter products by search (client-side)
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
//         {category ? `${category} Products` : "Products"}
//       </h2>

//       {/* 🔎 Search Bar */}
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border rounded-lg p-2 w-1/2"
//         />
//       </div>

//       {/* Products Grid */}
//       <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <div
//               key={product._id}
//               className="border rounded-xl p-5 flex flex-col justify-between items-center bg-white shadow-md hover:shadow-lg transition"
//             >
//               {/* Product Image */}
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-52 object-cover mb-4 rounded-md"
//               />

//               {/* Product Info */}
//               <div className="w-full text-center">
//                 <h4 className="text-lg font-semibold text-gray-800 truncate">
//                   {product.name}
//                 </h4>
//                 <p className="text-sm text-gray-600 line-clamp-2 mb-2">
//                   {product.description}
//                 </p>
//                 <p className="text-indigo-600 font-bold text-lg mb-2">
//                   ${product.price}
//                 </p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   Stock: {product.countInStock}
//                 </p>

//                 {/* Average Rating */}
//                 <p className="text-sm text-yellow-500 mb-2">
//                   Rating: {product.rating.toFixed(1)} / 5 ({product.numReviews}{" "}
//                   reviews)
//                 </p>

//                 {/* Reviews */}
//                 {product.reviews && product.reviews.length > 0 && (
//                   <div className="text-left mt-2 max-h-32 overflow-y-auto">
//                     <h5 className="font-semibold text-gray-700 mb-1">Reviews:</h5>
//                     {product.reviews.map((review, index) => (
//                       <div key={index} className="border-b pb-1 mb-1">
//                         <p className="text-gray-800 font-semibold">
//                           {review.name}
//                         </p>
//                         <p className="text-yellow-500">
//                           Rating: {review.rating} / 5
//                         </p>
//                         <p className="text-gray-600 text-sm">{review.comment}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-2 mt-4 w-full">
//                 <button
//                   onClick={() => addToCart(product)}
//                   className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition flex-1"
//                 >
//                   Add to Cart
//                 </button>

//                 <button
//                   onClick={() => addToWishlist(product._id)}
//                   className={`px-4 py-2 rounded-lg flex-1 transition ${
//                     wishlist.includes(product._id)
//                       ? "bg-red-500 text-white"
//                       : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                   }`}
//                 >
//                   {wishlist.includes(product._id)
//                     ? "❤️ Wishlisted"
//                     : "🤍 Wishlist"}
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">
//             No products found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Products;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return [];
    const saved = localStorage.getItem(`cart_${user._id}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [addedMap, setAddedMap] = useState({});
  const [loading , setloading] = useState(true);

  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    const fetch = async () => {
      try {
        setloading(true);
        let url = "https://mern-ecommerce-pg1x.onrender.com/api/products";
        if (category) url += `?category=${category}`;
        const { data } = await axios.get(url);
        setProducts(data);
      } catch (e) { console.log(e); }
      finally { setloading(false); }
    };
    fetch();
  }, [category]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;
      try {
        const { data } = await API.get("/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(data.map((p) => p._id));
      } catch (e) { console.log(e); }
    };
    fetchWishlist();
  }, []);

  const addToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Please login first");
    const existing = cart.find((i) => i._id === product._id);
    const updated = existing
      ? cart.map((i) => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...cart, { ...product, quantity: 1 }];
    setCart(updated);
    localStorage.setItem(`cart_${user._id}`, JSON.stringify(updated));
    setAddedMap((prev) => ({ ...prev, [product._id]: true }));
  };

  const toggleWishlist = async (productId) => {
    const token = sessionStorage.getItem("token");
    if (!token) return alert("Please login first");
    try {
      await API.post(`/wishlist/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );
    } catch (e) { console.log(e); }
  };

  const discount = (price, mrp) => mrp ? Math.round((1 - price / mrp) * 100) : 0;

  const Stars = ({ rating }) => (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map((i) => (
        <span key={i} className={`text-xs ${i <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}>★</span>
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating?.toFixed(1)}</span>
    </div>
  );

  // Filter + Sort
  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  if (sort === "low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "high") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

    if (loading) return (
    <div className="min-h-screen bg-gray-50 px-6 py-10"
        style={{ animation: "fadeIn 0.4s ease" }}>
      <div className="h-7 bg-gray-200 rounded w-40 mx-auto mb-8 animate-pulse"/>
      <div className="flex gap-3 max-w-xl mx-auto mb-10">
        <div className="flex-1 h-12 bg-gray-200 rounded-xl animate-pulse"/>
        <div className="w-32 h-12 bg-gray-200 rounded-xl animate-pulse"/>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
              style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="aspect-square bg-gray-100"/>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-100 rounded w-3/4"/>
              <div className="h-3 bg-gray-100 rounded w-full"/>
              <div className="h-3 bg-gray-100 rounded w-1/2"/>
              <div className="h-4 bg-gray-100 rounded w-1/3 mt-2"/>
              <div className="h-9 bg-gray-100 rounded-xl mt-3"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10"
         style={{ animation: "fadeIn 0.4s ease" }}>

      {/* Header */}
      <h2 className="text-2xl font-medium text-gray-900 text-center mb-8">
        {category ? `${category}` : "All Products"}
      </h2>

      {/* Search + Sort */}
      <div className="flex gap-3 max-w-xl mx-auto mb-10">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
               viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                       focus:outline-none focus:border-indigo-500 focus:ring-4
                       focus:ring-indigo-500/10 transition-all"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                     focus:outline-none focus:border-indigo-500 transition-all cursor-pointer">
          <option value="">Sort by</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>  
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
        {filtered.length > 0 ? filtered.map((product, idx) => (
          <div key={product._id}
               className="group bg-white border border-gray-100 rounded-2xl overflow-hidden
                          flex flex-col hover:-translate-y-1 hover:shadow-lg
                          hover:border-gray-200 transition-all duration-200"
               style={{ animation: `fadeUp 0.5s ${idx * 0.05}s cubic-bezier(0.22,1,0.36,1) both` }}>

            {/* Image */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
              <img src={product.image} alt={product.name}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>

              {/* Badges */}
              {product.isNew && (
                <span className="absolute top-2.5 left-2.5 bg-indigo-500 text-white
                                  text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  New
                </span>
              )}
              {product.countInStock === 0 && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border">
                    Out of stock
                  </span>
                </div>
              )}

              {/* Wishlist btn */}
              <button
                onClick={() => toggleWishlist(product._id)}
                className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white border
                           border-gray-200 flex items-center justify-center text-sm
                           opacity-0 group-hover:opacity-100 hover:scale-110
                           transition-all duration-200 shadow-sm"
                style={wishlist.includes(product._id) ? { opacity: 1 } : {}}>
                {wishlist.includes(product._id) ? "❤️" : "🤍"}
              </button>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
              <Stars rating={product.rating} />

              <div className="flex items-baseline gap-2 mt-auto pt-1">
                <span className="text-base font-bold text-gray-900">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.mrp && (
                  <>
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.mrp?.toLocaleString()}
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      {discount(product.price, product.mrp)}% off
                    </span>
                  </>
                )}
              </div>

              {product.countInStock <= 3 && product.countInStock > 0 && (
                <p className="text-xs text-red-500 font-medium">
                  Only {product.countInStock} left!
                </p>
              )}
            </div>

            {/* Add to Cart */}
            <div className="px-4 pb-4">
              <button
                onClick={() => addToCart(product)}
                disabled={product.countInStock === 0}
                className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all
                  ${addedMap[product._id]
                    ? "bg-green-600 text-white"
                    : product.countInStock === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:opacity-85 hover:scale-[1.01] active:scale-[0.98]"
                  }`}>
                {addedMap[product._id] ? "✓ Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center py-20 text-gray-400">
            No products found.
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

export default Products;
