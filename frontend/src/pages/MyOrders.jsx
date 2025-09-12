import { useEffect, useState } from "react";
import API from "../api";
function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await API.get("/orders/myorders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading your orders...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (orders.length === 0) return <p className="text-center mt-10 text-gray-600">No orders found.</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Order ID: {order._id}</h3>
            <p className="text-gray-600 mb-2">Total Price: <span className="text-green-600">${order.totalPrice.toFixed(2)}</span></p>
            <p className="text-gray-600 mb-2">Payment Method: {order.paymentMethod}</p>
            <p className="text-gray-600 mb-4">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>

             <p className="text-gray-600 mb-4">
              Delivery Status:{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.isDelivered
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {order.isDelivered ? "Delivered" : "Pending"}
              </span>
            </p>
         
            <div className="space-y-3">
              {order.orderItems.map((item) => (
                <div key={item.product} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="text-gray-800 font-semibold">{item.name}</h4>
                      <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <p className="text-indigo-600 font-bold">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
