import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Checkout() {
  const navigate = useNavigate();
  // const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem(`cart_${user?._id}`)) || []
  );
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // this for  CASH ORDER
  
  const handleCashOrder = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      setLoading(true);

      const orderItems = cart.map((item) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        product: item._id,
        image: item.image,
      }));

      await API.post(
        "/orders",
        {
          orderItems,
          shippingAddress: { address, city, postalCode, country },
          paymentMethod: "Cash",
          totalPrice,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully!");
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.removeItem(`cart_${user._id}`);  
      setCart([]);   
      navigate("/myorders");
    } catch (err) {
      console.log(err);
      alert("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  // this for  Razorpay Payment

  const handlePayment = async () => {
    console.log(address, city, postalCode, country);
    const token = sessionStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      setLoading(true);
      const orderItems = cart.map((item) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        product: item._id,
        image: item.image,
      }));

      const { data } = await API.post(
        "/payment/create-order",
        {
          amount: totalPrice,
          orderItems,
          shippingAddress: { address, city, postalCode, country },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const options = {
        key: "rzp_test_ScIAFYzK9Nd6M7",
        amount: data.razorpayOrder.amount,   
        currency: data.razorpayOrder.currency, 
        name: "MERN Store",
        description: "Payment",
          order_id: data.razorpayOrder.id, 


        handler: async function (response) {
              console.log("✅ SUCCESS RESPONSE:", response);
          try {
            // 2. VERIFY PAYMENT FIRST
            const verifyRes = await API.post("/payment/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
                  console.log("✅ VERIFY RESPONSE:", verifyRes.data);

            if (!verifyRes.data.success) {
              alert("Payment verification failed");
              return;
            }
            alert("Payment verified & Successful 🎉");
            const user = JSON.parse(localStorage.getItem("user"));
            localStorage.removeItem(`cart_${user._id}`);
            setCart([]);
            navigate("/myorders");
          } catch (err) {
            console.log(err);
            alert("Payment verification failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Checkout
        </h2>

        <div className="space-y-4">

          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="w-full p-2 border rounded" />

          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="w-full p-2 border rounded" />

          <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" className="w-full p-2 border rounded" />

          <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="w-full p-2 border rounded" />

          <h3 className="text-lg font-semibold">
            Total: ₹{totalPrice}
          </h3>

          <button
            type="button"
            disabled={loading}
            onClick={handleCashOrder}
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Cash Order
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handlePayment}
            className="w-full bg-green-600 text-white py-3 rounded"
          >
            Pay with Razorpay
          </button>

        </div>
      </div>
    </div>
  );
}

export default Checkout;