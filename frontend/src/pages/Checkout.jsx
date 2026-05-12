// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// function Checkout() {
//   const navigate = useNavigate();
//   // const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [cart, setCart] = useState(
//     JSON.parse(localStorage.getItem(`cart_${user?._id}`)) || []
//   );
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [country, setCountry] = useState("");
//   const [loading, setLoading] = useState(false);

//   const totalPrice = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   // this for  CASH ORDER
  
//   const handleCashOrder = async () => {
//     const token = sessionStorage.getItem("token");
//     if (!token) return navigate("/login");

//     try {
//       setLoading(true);

//       const orderItems = cart.map((item) => ({
//         name: item.name,
//         qty: item.quantity,
//         price: item.price,
//         product: item._id,
//         image: item.image,
//       }));

//       await API.post(
//         "/orders",
//         {
//           orderItems,
//           shippingAddress: { address, city, postalCode, country },
//           paymentMethod: "Cash",
//           totalPrice,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Order placed successfully!");
//       const user = JSON.parse(localStorage.getItem("user"));
//       localStorage.removeItem(`cart_${user._id}`);  
//       setCart([]);   
//       navigate("/myorders");
//     } catch (err) {
//       console.log(err);
//       alert("Error placing order");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // this for  Razorpay Payment

//   const handlePayment = async () => {
//     console.log(address, city, postalCode, country);
//     const token = sessionStorage.getItem("token");
//     if (!token) return navigate("/login");

//     try {
//       setLoading(true);
//       const orderItems = cart.map((item) => ({
//         name: item.name,
//         qty: item.quantity,
//         price: item.price,
//         product: item._id,
//         image: item.image,
//       }));

//       const { data } = await API.post(
//         "/payment/create-order",
//         {
//           amount: totalPrice,
//           orderItems,
//           shippingAddress: { address, city, postalCode, country },
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const options = {
//         key: "rzp_test_ScIAFYzK9Nd6M7",
//         amount: data.razorpayOrder.amount,   
//         currency: data.razorpayOrder.currency, 
//         name: "MERN Store",
//         description: "Payment",
//           order_id: data.razorpayOrder.id, 


//         handler: async function (response) {
//               console.log("✅ SUCCESS RESPONSE:", response);
//           try {
//             // 2. VERIFY PAYMENT FIRST
//             const verifyRes = await API.post("/payment/verify", {
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
//             });
//                   console.log("✅ VERIFY RESPONSE:", verifyRes.data);

//             if (!verifyRes.data.success) {
//               alert("Payment verification failed");
//               return;
//             }
//             alert("Payment verified & Successful 🎉");
//             const user = JSON.parse(localStorage.getItem("user"));
//             localStorage.removeItem(`cart_${user._id}`);
//             setCart([]);
//             navigate("/myorders");
//           } catch (err) {
//             console.log(err);
//             alert("Payment verification failed");
//           }
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.log(error);
//       alert("Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">

//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Checkout
//         </h2>

//         <div className="space-y-4">

//           <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="w-full p-2 border rounded" />

//           <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="w-full p-2 border rounded" />

//           <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" className="w-full p-2 border rounded" />

//           <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="w-full p-2 border rounded" />

//           <h3 className="text-lg font-semibold">
//             Total: ₹{totalPrice}
//           </h3>

//           <button
//             type="button"
//             disabled={loading}
//             onClick={handleCashOrder}
//             className="w-full bg-blue-600 text-white py-3 rounded"
//           >
//             Cash Order
//           </button>

//           <button
//             type="button"
//             disabled={loading}
//             onClick={handlePayment}
//             className="w-full bg-green-600 text-white py-3 rounded"
//           >
//             Pay with Razorpay
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Checkout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem(`cart_${user?._id}`)) || []
  );
  const [form, setForm] = useState({
    address: "", city: "", postalCode: "", country: ""
  });
  const [payMethod, setPayMethod] = useState("cash");
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const orderItems = cart.map((item) => ({
    name: item.name, qty: item.quantity, price: item.price,
    product: item._id, image: item.image,
  }));

  const clearCart = () => {
    localStorage.removeItem(`cart_${user._id}`);
    setCart([]);
  };

  const handleCashOrder = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return navigate("/login");
    try {
      setLoading(true);
      await API.post("/orders", {
        orderItems,
        shippingAddress: form,
        paymentMethod: "Cash",
        totalPrice,
      }, { headers: { Authorization: `Bearer ${token}` } });
      clearCart();
      navigate("/myorders");
    } catch (err) {
      console.log(err);
    } finally { setLoading(false); }
  };

  const handlePayment = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return navigate("/login");
    try {
      setLoading(true);
      const { data } = await API.post("/payment/create-order", {
        amount: totalPrice, orderItems, shippingAddress: form,
      }, { headers: { Authorization: `Bearer ${token}` } });

      const options = {
        key: "rzp_test_ScIAFYzK9Nd6M7",
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        name: "GadgetStore",
        description: "Payment",
        order_id: data.razorpayOrder.id,
        handler: async (response) => {
          try {
            const verifyRes = await API.post("/payment/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (!verifyRes.data.success) return alert("Payment verification failed");
            clearCart();
            navigate("/myorders");
          } catch (err) { console.log(err); }
        },
      };
      new window.Razorpay(options).open();
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12"
         style={{ animation: "fadeIn 0.4s ease" }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-900 mb-8">Checkout</h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left — Address + Payment */}
          <div className="lg:col-span-3 space-y-6">

            {/* Shipping */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Shipping Address</h3>
              <div className="space-y-3">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🏠</span>
                  <input name="address" value={form.address} onChange={handleChange}
                    placeholder="Street address"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                               text-sm focus:outline-none focus:border-indigo-500 focus:bg-white
                               focus:ring-4 focus:ring-indigo-500/10 transition-all"/>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🏙</span>
                    <input name="city" value={form.city} onChange={handleChange}
                      placeholder="City"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                                 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white
                                 focus:ring-4 focus:ring-indigo-500/10 transition-all"/>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">📮</span>
                    <input name="postalCode" value={form.postalCode} onChange={handleChange}
                      placeholder="Postal code"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                                 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white
                                 focus:ring-4 focus:ring-indigo-500/10 transition-all"/>
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🌍</span>
                  <input name="country" value={form.country} onChange={handleChange}
                    placeholder="Country"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                               text-sm focus:outline-none focus:border-indigo-500 focus:bg-white
                               focus:ring-4 focus:ring-indigo-500/10 transition-all"/>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["cash", "💵", "Cash on Delivery", "Pay when delivered"],
                  ["razorpay", "⚡", "Razorpay", "Cards, UPI & more"],
                ].map(([val, icon, label, sub]) => (
                  <button key={val} type="button"
                    onClick={() => setPayMethod(val)}
                    className={`p-4 rounded-xl border text-left transition-all
                      ${payMethod === val
                        ? "border-indigo-500 bg-indigo-50 border-2"
                        : "border-gray-200 hover:border-gray-300"}`}>
                    <div className="text-2xl mb-2">{icon}</div>
                    <div className="text-sm font-medium text-gray-900">{label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name}
                           className="w-10 h-10 rounded-xl object-cover bg-gray-100"/>
                      <div>
                        <p className="text-xs font-medium text-gray-900 max-w-[120px] truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2
                                 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Place order button */}
              <button
                onClick={payMethod === "cash" ? handleCashOrder : handlePayment}
                disabled={loading}
                className={`w-full mt-5 py-3.5 rounded-xl font-medium text-sm transition-all
                  ${loading
                    ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:opacity-85 hover:scale-[1.01] active:scale-[0.98]"
                  }`}>
                {loading
                  ? "Processing..."
                  : payMethod === "cash"
                  ? "💵 Place Order (COD)"
                  : "⚡ Pay with Razorpay"}
              </button>

              <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                🔒 Secured by Razorpay
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

export default Checkout;