// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Cart() {
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const savedCart = localStorage.getItem(`cart_${user?._id}`);
//     setCart(savedCart ? JSON.parse(savedCart) : []);
//   }, []);

//   const removeItem = (id) => {
//     const updatedCart = cart.filter((item) => item._id !== id);
//     setCart(updatedCart);
//     // localStorage.setItem("cart", JSON.stringify(updatedCart));
//     const user = JSON.parse(localStorage.getItem("user"));
//     localStorage.setItem(`cart_${user._id}`, JSON.stringify(updatedCart));
//   };

//   const updateQuantity = (id, quantity) => {
//     const updatedCart = cart.map((item) =>
//       item._id === id ? { ...item, quantity: Number(quantity) } : item
//     );
//     setCart(updatedCart);
//     const user = JSON.parse(localStorage.getItem("user"));
//     localStorage.setItem(`cart_${user._id}`, JSON.stringify(updatedCart));
//   };

//   const handleCheckout = () => {
//     navigate("/checkout");
//   };

//   const totalPrice = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   if (cart.length === 0)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-xl text-gray-600">Your cart is empty.</p>
//       </div>
//     );

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Cart</h2>

//       <div className="space-y-6">
//         {cart.map((item) => (
//           <div
//             key={item._id}
//             className="flex flex-col md:flex-row items-center md:justify-between bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition"
//           >
//             <div className="flex items-center space-x-4 w-full md:w-2/3">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-24 h-24 object-cover rounded-md"
//               />
//               <div className="flex-1">
//                 <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
//                 <p className="text-gray-600">{item.description}</p>
//                 <p className="text-indigo-600 font-bold mt-1">${item.price}</p>
//                 <div className="mt-2">
//                   Quantity:{" "}
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     min={1}
//                     onChange={(e) => updateQuantity(item._id, e.target.value)}
//                     className="border rounded px-2 py-1 w-16 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 md:mt-0">
//               <button
//                 onClick={() => removeItem(item._id)}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
//         <h3 className="text-2xl font-bold text-gray-800">
//           Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
//         </h3>
//         <button
//           onClick={handleCheckout}
//           className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
//         >
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Cart;

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const saved = localStorage.getItem(`cart_${user?._id}`);
    setCart(saved ? JSON.parse(saved) : []);
  }, []);

  const saveCart = (updated) => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCart(updated);
    localStorage.setItem(`cart_${user._id}`, JSON.stringify(updated));
  };

  const removeItem = (id) => saveCart(cart.filter((i) => i._id !== id));

  const updateQty = (id, delta) => {
    saveCart(cart.map((i) =>
      i._id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    ));
  };

  const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  // Empty state
  if (cart.length === 0) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4"
         style={{ animation: "fadeIn 0.4s ease" }}>
      <div className="text-6xl mb-5">🛒</div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
      <p className="text-gray-400 text-sm mb-6">Add some products and come back!</p>
      <Link to="/products"
            className="px-6 py-3 bg-black text-white rounded-xl text-sm font-medium
                       hover:opacity-85 transition-all">
        Browse Products
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10"
         style={{ animation: "fadeIn 0.4s ease" }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-900 mb-8">
          Your Cart <span className="text-gray-400 text-lg font-normal">({cart.length} items)</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item, idx) => (
              <div key={item._id}
                   className="bg-white border border-gray-100 rounded-2xl p-4
                              flex items-center gap-4 hover:border-gray-200 transition-all"
                   style={{ animation: `fadeUp 0.5s ${idx * 0.07}s cubic-bezier(0.22,1,0.36,1) both` }}>

                <img src={item.image} alt={item.name}
                     className="w-20 h-20 rounded-xl object-cover bg-gray-100 flex-shrink-0"/>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{item.description}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    ₹{item.price.toLocaleString()}
                  </p>

                  {/* Qty control */}
                  <div className="flex items-center mt-2 border border-gray-200 rounded-xl
                                   w-fit overflow-hidden">
                    <button onClick={() => updateQty(item._id, -1)}
                            className="w-8 h-8 text-gray-500 hover:bg-gray-100
                                       transition text-lg flex items-center justify-center">
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-gray-900
                                      border-x border-gray-200">
                      {item.quantity}
                    </span>
                    <button onClick={() => updateQty(item._id, 1)}
                            className="w-8 h-8 text-gray-500 hover:bg-gray-100
                                       transition text-lg flex items-center justify-center">
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button onClick={() => removeItem(item._id)}
                          className="text-xs text-gray-400 hover:text-red-500
                                     hover:bg-red-50 px-2 py-1 rounded-lg transition-all">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 sticky top-6">
              <h3 className="text-sm font-medium text-gray-900 mb-5">Order Summary</h3>

              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item._id} className="flex justify-between text-xs text-gray-500">
                    <span className="truncate max-w-[140px]">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-gray-900 flex-shrink-0 ml-2">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900
                                 border-t border-gray-100 pt-3 mt-1">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button onClick={() => navigate("/checkout")}
                      className="w-full mt-5 py-3.5 bg-black text-white rounded-xl
                                 text-sm font-medium hover:opacity-85 hover:scale-[1.01]
                                 active:scale-[0.98] transition-all">
                Proceed to Checkout →
              </button>

              <Link to="/products"
                    className="block text-center text-xs text-gray-400 mt-3
                               hover:text-gray-600 transition">
                ← Continue Shopping
              </Link>

              <p className="text-center text-xs text-gray-400 mt-4 flex items-center
                             justify-center gap-1">
                🔒 Safe & Secure Checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

export default Cart;
