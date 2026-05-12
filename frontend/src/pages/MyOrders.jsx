// import { useEffect, useState } from "react";
// import API from "../api";
// function MyOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = sessionStorage.getItem("token");
//       if (!token) {
//         setError("You must be logged in to view your orders.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const { data } = await API.get("/orders/myorders", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setOrders(data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch orders.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) return <p className="text-center mt-10 text-gray-600">Loading your orders...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
//   if (orders.length === 0) return <p className="text-center mt-10 text-gray-600">No orders found.</p>;

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">My Orders</h2>

//       <div className="space-y-6">
//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
//           >
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Order ID: {order._id}</h3>
//             <p className="text-gray-600 mb-2">Total Price: <span className="text-green-600">${order.totalPrice.toFixed(2)}</span></p>
//             <p className="text-gray-600 mb-2">Payment Method: {order.paymentMethod}</p>
//             {/* 🔥 PAYMENT STATUS */}
//                 <p className="text-gray-600 mb-4">
//                   Payment Status:{" "}
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                       order.isPaid
//                         ? "bg-green-100 text-green-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {order.isPaid ? "Paid ✅" : "Pending ❌"}
//                   </span>
//                 </p>
//             <p className="text-gray-600 mb-4">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>

//              <p className="text-gray-600 mb-4">
//               Delivery Status:{" "}
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                   order.isDelivered
//                     ? "bg-green-100 text-green-600"
//                     : "bg-yellow-100 text-yellow-600"
//                 }`}
//               >
//                 {order.isDelivered ? "Delivered" : "Pending"}
//               </span>
//             </p>
         
//             <div className="space-y-3">
//               {order.orderItems.map((item) => (
//                 <div key={item.product} className="flex items-center justify-between border-b pb-2">
//                   <div className="flex items-center space-x-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded-md"
//                     />
//                     <div>
//                       <h4 className="text-gray-800 font-semibold">{item.name}</h4>
//                       <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
//                     </div>
//                   </div>
//                   <p className="text-indigo-600 font-bold">${item.price}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MyOrders;

import { useEffect, useState } from "react";
import API from "../api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) { setError("Please login to view orders."); setLoading(false); return; }
      try {
        const { data } = await API.get("/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders.");
      } finally { setLoading(false); }
    };
    fetchOrders();
  }, []);

  // ── Loading skeleton ──
  if (loading) return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-4">
      {[1,2].map(i => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
          <div className="h-4 bg-gray-100 rounded w-1/3 mb-3"/>
          <div className="h-3 bg-gray-100 rounded w-1/4 mb-6"/>
          <div className="flex gap-3 mb-4">
            <div className="h-6 bg-gray-100 rounded-full w-16"/>
            <div className="h-6 bg-gray-100 rounded-full w-20"/>
          </div>
          <div className="h-14 bg-gray-100 rounded-xl"/>
        </div>
      ))}
    </div>
  );

  if (error) return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <div className="text-4xl mb-4">⚠️</div>
      <p className="text-gray-500">{error}</p>
    </div>
  );

  if (orders.length === 0) return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <div className="text-5xl mb-4">📦</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
      <p className="text-gray-400 text-sm">Your orders will appear here once you shop!</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10"
         style={{ animation: "fadeIn 0.4s ease" }}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-900 mb-8">My Orders</h2>

        <div className="space-y-4">
          {orders.map((order, idx) => (
            <div key={order._id}
                 className="bg-white border border-gray-100 rounded-2xl p-6
                            hover:border-gray-200 transition-all"
                 style={{ animation: `fadeUp 0.5s ${idx * 0.07}s cubic-bezier(0.22,1,0.36,1) both` }}>

              {/* Order header */}
              <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                <div>
                  <p className="text-xs text-gray-400 font-mono mb-1">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-gray-900">
                    ₹{order.totalPrice.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">{order.paymentMethod}</p>
                </div>
              </div>

              {/* Status pills */}
              <div className="flex gap-2 flex-wrap mb-5">
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full border
                  ${order.isPaid
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-600 border-red-200"}`}>
                  {order.isPaid ? "✓ Paid" : "✗ Payment Pending"}
                </span>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full border
                  ${order.isDelivered
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                  {order.isDelivered ? "✓ Delivered" : "⏳ On the way"}
                </span>
              </div>

              {/* Order items */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                {order.orderItems.map((item) => (
                  <div key={item.product}
                       className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name}
                           className="w-12 h-12 rounded-xl object-cover bg-gray-100"/>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-indigo-500">
                      ₹{Number(item.price).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
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

export default MyOrders;
