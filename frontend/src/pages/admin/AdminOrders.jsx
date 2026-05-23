// src/pages/admin/AdminOrders.jsx
import { useEffect, useState } from "react";
import API from "../../api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const { data } = await API.get("/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (e) { console.log(e); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const markDelivered = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    
    const { data } = await API.put(`/admin/orders/${id}/deliver`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Delivered response:", data); 

    const res = await API.get("/admin/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(res.data);

  } catch (e) { 
    console.log("markDelivered error:", e); 
  }
};

  if (loading) return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
            <div className="h-4 bg-gray-100 rounded w-1/3 mb-3"/>
            <div className="h-3 bg-gray-100 rounded w-1/4"/>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10"
         style={{ animation: "fadeIn 0.4s ease" }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-medium text-gray-900 mb-8">
          All Orders <span className="text-gray-400 text-lg font-normal">({orders.length})</span>
        </h1>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Order ID","User","Total","Paid","Delivered","Action"].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order, i) => (
                <tr key={order._id} className="hover:bg-gray-50 transition"
                    style={{ animation: `fadeUp 0.4s ${i*0.04}s both` }}>
                  <td className="px-5 py-4 font-mono text-xs text-gray-400">
                    #{order._id.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-gray-900">{order.user?.name}</div>
                    <div className="text-xs text-gray-400">{order.user?.email}</div>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                    ₹{order.totalPrice?.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full
                      ${order.isPaid
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-600 border border-red-200"}`}>
                      {order.isPaid ? "✓ Paid" : "✗ Pending"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full
                      ${order.isDelivered
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                      {order.isDelivered ? "✓ Delivered" : "⏳ Pending"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {!order.isDelivered && (
                      <button onClick={() => markDelivered(order._id)}
                              className="text-xs font-medium px-3 py-1.5 rounded-lg
                                         bg-black text-white hover:opacity-80 transition">
                        Mark Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

export default AdminOrders;